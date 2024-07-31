import { Router } from 'express'

import {
	addUser,
	getUsers,
	getUserWithId,
	editUserWithId,
	removeUserWithId,
} from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { doesUserExists, userAlreadyExists, validatedUser } from '../middlewares/users.middleware'

const router = Router()

// router.get('/', authMiddleware, getUsers)
router.get('/:id', authMiddleware, doesUserExists, getUserWithId)
router.post('/', userAlreadyExists, validatedUser, addUser)
router.patch('/:id', authMiddleware, doesUserExists, validatedUser, editUserWithId)
router.delete('/:id', authMiddleware, doesUserExists, removeUserWithId)

export default router
