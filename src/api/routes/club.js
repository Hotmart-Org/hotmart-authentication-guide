import { Router } from 'express'
import ClubController from '../controllers/club'
import { ROOT, club as clubPaths } from '../constants/paths'
const { BASE, MODULES, MODULES_PAGES, USERS, USERS_LESSONS } = clubPaths

const router = Router()
const clubController = new ClubController(BASE)

router.get(ROOT, clubController.loggedMiddleware, (req, res) => clubController.root(req, res))
router.get(MODULES, (req, res) => clubController.getData(req, res))
router.get(MODULES_PAGES, (req, res) => clubController.getData(req, res))
router.get(USERS, (req, res) => clubController.getData(req, res))
router.get(USERS_LESSONS, (req, res) => clubController.getData(req, res))

export default router
