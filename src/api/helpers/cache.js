import nodeCache from 'node-cache'
import TokenController from '../controllers/token'

const thirtyDays = 86350 * 30
const twoHours = 7200
const refreshTokenTTL = thirtyDays
const tokenTTL = twoHours
const cacheTokenKeys = {
  REFRESH_TOKEN: 'refreshToken',
  ID_TOKEN: 'idToken',
  ACCESS_TOKEN: 'accessToken',
  LOGGED_TOKEN: 'loggedToken',
}
const cache = new nodeCache({ checkperiod: 60, deleteOnExpire: false })

cache.on('expired', async function (key, value) {
  const isRefreshTokenExpired = key === cacheTokenKeys.REFRESH_TOKEN

  if (isRefreshTokenExpired) {
    const tokenController = new TokenController()
    const { refresh_token, id_token, access_token } = await tokenController.refreshToken(value)

    setCacheTokens(refresh_token, id_token, access_token)
  }
})

function setCacheTokens(refreshToken, idToken, accessToken) {
  if (refreshToken && idToken && accessToken) {
    const { REFRESH_TOKEN, ID_TOKEN, ACCESS_TOKEN, LOGGED_TOKEN } = cacheTokenKeys

    cache.mset([
      { key: REFRESH_TOKEN, val: refreshToken, ttl: refreshTokenTTL },
      { key: ID_TOKEN, val: idToken, ttl: tokenTTL },
      { key: ACCESS_TOKEN, val: accessToken, ttl: tokenTTL },
      { key: LOGGED_TOKEN, val: idToken, ttl: tokenTTL },
    ])
  }
}

function getCachedTokens() {
  const cacheTokens = Object.values(cacheTokenKeys)
  return cache.mget(cacheTokens)
}

function delCachedTokens() {
  const cacheTokens = Object.values(cacheTokenKeys)
  return cache.del(cacheTokens)
}

export { cache, cacheTokenKeys, setCacheTokens, getCachedTokens, delCachedTokens }
