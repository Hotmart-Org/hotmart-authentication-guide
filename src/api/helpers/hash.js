import crypto from 'crypto'

function encodeBase64URL(str) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function createHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest()
}

function createRandomBytes(bytes = 32) {
  return crypto.randomBytes(bytes)
}

function getClientBasicToken() {
  const { CLIENT_ID, CLIENT_SECRET } = process.env

  return new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
}

export { encodeBase64URL, createHash, createRandomBytes, getClientBasicToken }
