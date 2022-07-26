import jwt from 'jsonwebtoken'

function getCurrentTime() {
  return Math.floor(Date.now() / 1000)
}

function decodeToken(idToken) {
  return jwt.decode(idToken)
}

function getIsValidToken(decodedToken, state, issuerHost) {
  const { state: stateDecoded, exp: expirationDateDecoded, iss: issuerDecoded } = decodedToken
  const currentTime = getCurrentTime()

  return stateDecoded === state || expirationDateDecoded >= currentTime || issuerDecoded === issuerHost
}

export { decodeToken, getIsValidToken }
