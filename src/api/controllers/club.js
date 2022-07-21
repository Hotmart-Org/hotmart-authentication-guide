import { club } from '../constants/paths'
import { buildFullPath } from '../helpers/paths'
import CommonController from './common'

class ClubController extends CommonController {
  constructor(baseEndpoint) {
    super(baseEndpoint)
  }

  buildPath(path) {
    return buildFullPath(`${club.ROOT}${path}`)
  }

  root(_, res) {
    const querystringFilter = 'subdomain=:subdomain'

    return res.status(200).send({
      GET: {
        modules: this.buildPath(`${club.MODULES}?${querystringFilter}`),
        modulePages: this.buildPath(`${club.MODULES_PAGES}?${querystringFilter}`),
        users: this.buildPath(`${club.USERS}?${querystringFilter}`),
        userLessons: this.buildPath(`${club.USERS_LESSONS}?${querystringFilter}`),
      },
    })
  }
}

export default ClubController
