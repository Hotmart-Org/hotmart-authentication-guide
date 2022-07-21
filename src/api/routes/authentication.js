import { Router } from 'express'
import AuthenticationController from '../controllers/authentication'
import { authentication as authenticationPaths } from '../constants/paths'
const { ROOT, LOGIN, CALLBACK, PROFILE, LOGOUT, REVOKE } = authenticationPaths

const router = Router()
const authenticationController = new AuthenticationController()

router.get(ROOT, authenticationController.root)
router.get(LOGIN, authenticationController.login)
router.get(PROFILE, authenticationController.getProfile)
router.get(CALLBACK, authenticationController.callbackLogged)
router.get(LOGOUT, authenticationController.logout)
router.get(REVOKE, authenticationController.revoke)

export default router
