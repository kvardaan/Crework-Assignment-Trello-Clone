import { Request, Response, Router } from 'express'

import userRoutes from './user.route'
import taskRoutes from './task.route'
import authRoutes from './auth.route'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/tasks', authMiddleware, taskRoutes)

export default router
