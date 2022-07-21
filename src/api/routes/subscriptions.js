import { Router } from 'express'
import SubscriptionsController from '../controllers/subscriptions'
import { ROOT, subscriptions as subscriptionsPaths } from '../constants/paths'
const { BASE, LIST, PURCHASES, CANCEL, REACTIVATE, CHANGE_DAY, LIST_CANCEL, LIST_REACTIVATE } = subscriptionsPaths

const router = Router()
const subscriptionsController = new SubscriptionsController(BASE)

router.get(ROOT, subscriptionsController.loggedMiddleware, (req, res) => subscriptionsController.root(req, res))
router.get(LIST, (req, res) => subscriptionsController.getData(req, res))
router.get(PURCHASES, (req, res) => subscriptionsController.getData(req, res))
router.post(CANCEL, (req, res) => subscriptionsController.postData(req, res))
router.post(REACTIVATE, (req, res) => subscriptionsController.postData(req, res))
router.post(LIST_CANCEL, (req, res) => subscriptionsController.postData(req, res))
router.post(LIST_REACTIVATE, (req, res) => subscriptionsController.postData(req, res))
router.patch(CHANGE_DAY, (req, res) => subscriptionsController.patchData(req, res))

export default router
