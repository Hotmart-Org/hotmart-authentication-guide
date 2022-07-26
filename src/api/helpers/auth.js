import * as HashHelpers from './hash'

function buildAuthParams() {
  const {
    API_HOST,
    CLIENT_CALLBACK_URL,
    SSO_HOST,
    SSO_AUTHORIZATION_PATH,
    CODE_VERIFIER,
    CLIENT_ID: clientId,
    REQUIRED_SCOPES,
    CLIENT_SCOPES,
    STATE_COOKIE: state,
  } = process.env

  const hash = HashHelpers.createHash(CODE_VERIFIER)
  const codeChallenge = HashHelpers.encodeBase64URL(hash)
  const uri = `${SSO_HOST}${SSO_AUTHORIZATION_PATH}`
  const redirectUri = `${API_HOST}${CLIENT_CALLBACK_URL}`
  const scope = `${REQUIRED_SCOPES} ${CLIENT_SCOPES}`

  return { uri, redirectUri, clientId, scope, state, codeChallenge }
}

export { buildAuthParams }
