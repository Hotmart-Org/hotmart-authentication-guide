import * as HttpHelpers from '../helpers/http'
import * as CacheHelpers from '../helpers/cache'
import * as ExceptionHelpers from '../helpers/exceptions'

class CommonController {
  constructor(baseEndpoint = '') {
    const baseUrl = `${process.env.DEVELOPERS_HOST}${baseEndpoint}`
    this.api = HttpHelpers.buildHttpInstance({ baseURL: baseUrl })
  }

  loggedMiddleware(_, res, next) {
    const { loggedToken } = CacheHelpers.getCachedTokens()

    if (loggedToken) {
      return next()
    }

    return res.status(401).send(ExceptionHelpers.unauthorized())
  }

  async getData(req, res) {
    const { url } = req
    return this.api.get(url).then((response) => HttpHelpers.buildResponseSuccess(response, res))
  }

  async postData(req, res) {
    const { url, body } = req
    return this.api.post(url, body).then((response) => HttpHelpers.buildResponseSuccess(response, res))
  }

  async patchData(req, res) {
    const { url, body } = req
    return this.api.patch(url, body).then((response) => HttpHelpers.buildResponseSuccess(response, res))
  }
}

export default CommonController
