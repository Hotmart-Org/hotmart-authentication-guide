import { subscriptions } from '../constants/paths'
import { buildFullPath } from '../helpers/paths'
import CommonController from './common'

class SubscriptionsController extends CommonController {
  constructor(baseEndpoint) {
    super(baseEndpoint)
  }

  buildPath(path) {
    return buildFullPath(`${subscriptions.ROOT}${path}`)
  }

  root(_, res) {
    const querystringFilter = 'status=:status&product_id=:productId&max_results=:maxResults'

    return res.status(200).send({
      GET: {
        list: this.buildPath(`${subscriptions.LIST}?${querystringFilter}`),
        purchases: this.buildPath(subscriptions.PURCHASES),
      },
      POST: {
        listCancel: this.buildPath(subscriptions.LIST_CANCEL),
        listReactivate: this.buildPath(subscriptions.LIST_REACTIVATE),
        cancel: this.buildPath(subscriptions.CANCEL),
        reactivate: this.buildPath(subscriptions.REACTIVATE),
      },
      PATCH: {
        changeDay: this.buildPath(subscriptions.CHANGE_DAY),
      },
    })
  }
}

export default SubscriptionsController
