import { Router } from 'express'
import SalesController from '../controllers/sales'
import { ROOT, sales as salesPaths } from '../constants/paths'
const { BASE, HISTORY, SUMMARY, USERS, COMMISSIONS, PRICE_DETAILS } = salesPaths

const router = Router()
const salesController = new SalesController(BASE)

router.get(ROOT, salesController.loggedMiddleware, (req, res) => salesController.root(req, res))
router.get(HISTORY, (req, res) => salesController.getData(req, res))
router.get(SUMMARY, (req, res) => salesController.getData(req, res))
router.get(USERS, (req, res) => salesController.getData(req, res))
router.get(COMMISSIONS, (req, res) => salesController.getData(req, res))
router.get(PRICE_DETAILS, (req, res) => salesController.getData(req, res))

export default router
