import { ROOT } from '../constants/paths'
import * as CookieHelpers from '../helpers/cookies'
import * as TokensHelpers from '../helpers/tokens'
import * as CacheHelpers from '../helpers/cache'
import * as AuthHelpers from '../helpers/auth'
import * as PathHelpers from '../helpers/paths'
import * as ExceptionHelpers from '../helpers/exceptions'
import CommonController from './common'
import TokenController from './token'

class AuthenticationController extends CommonController {
  constructor() {
    super()
  }

  root(_, res) {
    const { loggedToken } = CacheHelpers.getCachedTokens()
    const response = loggedToken ? PathHelpers.buildLoggedPaths() : PathHelpers.buildInitialPaths()

    return res.status(200).send(response)
  }

  login(_, res) {
    const LOGIN_FILENAME = 'login'
    const authParams = AuthHelpers.buildAuthParams()

    return res.render(LOGIN_FILENAME, authParams)
  }

  async callbackLogged(req, res) {
    const tokenController = new TokenController()
    const { refresh_token, id_token, access_token } = await tokenController.getTokens(req.query.code)

    CacheHelpers.setCacheTokens(refresh_token, id_token, access_token)
    CookieHelpers.deleteStateCookie(req)

    return res.redirect(ROOT)
  }

  getProfile(_, res) {
    const { STATE_COOKIE, SSO_ISSUER_URL } = process.env
    const { loggedToken, idToken } = CacheHelpers.getCachedTokens()

    if (loggedToken) {
      const token = TokensHelpers.decodeToken(idToken)
      const isValidToken = TokensHelpers.getIsValidToken(token, STATE_COOKIE, SSO_ISSUER_URL)

      if (isValidToken) {
        return res.status(200).send({ tokenId: idToken, token })
      }
    }

    return res.status(401).send(ExceptionHelpers.unauthorized())
  }

  logout(_, res) {
    const { SSO_HOST, CLIENT_LOGOUT_PATH } = process.env
    const { LOGGED_TOKEN } = CacheHelpers.cacheTokenKeys

    CacheHelpers.cache.del(LOGGED_TOKEN)

    res.redirect(`${SSO_HOST}${CLIENT_LOGOUT_PATH}`)
  }

  async revoke(req, res) {
    const { refreshToken, accessToken } = CacheHelpers.getCachedTokens()
    const tokenController = new TokenController()

    return Promise.all([
      tokenController.revoke(accessToken),
      tokenController.revoke(refreshToken),
      tokenController.logout(req, res),
    ]).then(() => CacheHelpers.delCachedTokens())
  }
}

export default AuthenticationController
