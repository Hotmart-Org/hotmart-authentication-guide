import * as HashHelpers from './helpers/hash'

const requiredScopes = 'openid developers'
const codeVerifierBytes = HashHelpers.createRandomBytes()
const stateCookieBytes = HashHelpers.createRandomBytes(16)

process.env['REQUIRED_SCOPES'] = requiredScopes
process.env['CODE_VERIFIER'] = HashHelpers.encodeBase64URL(codeVerifierBytes)
process.env['STATE_COOKIE'] = stateCookieBytes.toString('hex')
