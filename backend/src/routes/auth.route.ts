import { Router } from 'express'

import { login, logout } from '../controllers/auth.controller'
import { doesUserExists, validatedUser } from '../middlewares/users.middleware'

const router = Router()

router.post('/login', doesUserExists, login)
router.post('/logout', logout)

export default router
