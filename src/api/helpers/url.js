function buildLogoutUrl() {
  const { SSO_HOST, CLIENT_LOGOUT_PATH } = process.env
  return `${SSO_HOST}${CLIENT_LOGOUT_PATH}`
}

function buildRedirectLogoutUrl() {
  const { API_HOST, CLIENT_LOGOUT_PATH } = process.env
  return `${API_HOST}${CLIENT_LOGOUT_PATH}`
}

export { buildLogoutUrl, buildRedirectLogoutUrl }
