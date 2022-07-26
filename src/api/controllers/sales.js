import { sales } from '../constants/paths'
import { buildFullPath } from '../helpers/paths'
import CommonController from './common'

class SalesController extends CommonController {
  constructor(baseEndpoint) {
    super(baseEndpoint)
  }

  buildPath(path) {
    return buildFullPath(`${sales.ROOT}${path}`)
  }

  root(_, res) {
    return res.status(200).send({
      GET: {
        history: this.buildPath(sales.HISTORY),
        summary: this.buildPath(sales.SUMMARY),
        users: this.buildPath(sales.USERS),
        commissions: this.buildPath(sales.COMMISSIONS),
        priceDetails: this.buildPath(sales.PRICE_DETAILS),
      },
    })
  }
}

export default SalesController
