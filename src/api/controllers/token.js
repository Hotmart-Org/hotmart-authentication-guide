import axios from 'axios'
import qs from 'qs'
import * as HashHelpers from '../helpers/hash'
import * as CacheHelpers from '../helpers/cache'
import * as UrlHelpers from '../helpers/url'

class TokenController {
  getRedirectUrl() {
    const { API_HOST, CLIENT_CALLBACK_URL } = process.env

    return `${API_HOST}${CLIENT_CALLBACK_URL}`
  }

  async getTokens(code) {
    const { SSO_HOST, SSO_ACCESS_TOKEN_PATH, CLIENT_ID, CLIENT_SECRET, STATE_COOKIE, CODE_VERIFIER } = process.env
    const url = `${SSO_HOST}${SSO_ACCESS_TOKEN_PATH}`
    const redirectUri = this.getRedirectUrl()
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    }

    const data = qs.stringify({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: redirectUri,
      state: STATE_COOKIE,
      code_verifier: CODE_VERIFIER,
      code,
    })

    return axios.post(url, data, { headers }).then(({ data }) => data)
  }

  async refreshToken(currentRefreshToken) {
    const { SSO_HOST, SSO_ACCESS_TOKEN_PATH } = process.env
    const url = `${SSO_HOST}${SSO_ACCESS_TOKEN_PATH}`
    const clientBasicToken = HashHelpers.getClientBasicToken()

    const headers = {
      Authorization: `Basic ${clientBasicToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    }
    const data = qs.stringify({
      refresh_token: currentRefreshToken,
      grant_type: 'refresh_token',
    })

    return await axios.post(url, data, { headers }).then(({ data }) => data)
  }

  async logout(_, res) {
    const { API_HOST } = process.env
    const url = UrlHelpers.buildLogoutUrl()
    const { idToken } = CacheHelpers.getCachedTokens()

    const params = {
      id_token_hint: idToken,
      post_logout_redirect_uri: API_HOST,
    }

    return axios
      .get(url, { params })
      .then(() => res.redirect(url))
      .catch(console.log)
  }

  async revoke(tokenValue) {
    const { SSO_HOST, SSO_REVOKE_PATH } = process.env
    const url = `${SSO_HOST}${SSO_REVOKE_PATH}`
    const clientBaseToken = HashHelpers.getClientBasicToken()
    const headers = {
      Authorization: `Basic ${clientBaseToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    }
    const data = qs.stringify({
      token: tokenValue,
    })

    return axios
      .post(url, data, { headers })
      .then(({ data }) => data)
      .catch(console.log)
  }
}

export default TokenController
