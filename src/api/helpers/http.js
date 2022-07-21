import axios from 'axios'
import * as CacheHelpers from './cache'

function handleRequestSuccess(config) {
  const { idToken } = CacheHelpers.getCachedTokens()

  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = `Bearer ${idToken}`

  return config
}

function handleRequestError(error) {
  return error
}

function handleResponseSuccess(response) {
  return response
}

async function handleResponseError(error) {
  const { response } = error
  return response || error
}

function buildHttpInstance({ baseURL, ...options }) {
  const instance = axios.create({
    baseURL,
    ...options,
  })

  instance.interceptors.request.use(handleRequestSuccess, handleRequestError)
  instance.interceptors.response.use(handleResponseSuccess, handleResponseError)

  return instance
}

function buildResponseSuccess({ status, data }, res) {
  return res.status(status).send(data)
}

export { buildHttpInstance, buildResponseSuccess }
