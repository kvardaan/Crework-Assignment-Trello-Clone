import { Router } from 'express'

import { validatedTask } from '../middlewares/task.middleware'
import {
	addTask,
	getTasks,
	getTaskWithId,
	editTaskWithId,
	removeTaskWithId,
} from '../controllers/task.controller'

const router = Router()

router.get('/', getTasks)
router.get('/:id', getTaskWithId)
router.post('/', validatedTask, addTask)
router.patch('/:id', validatedTask, editTaskWithId)
router.delete('/:id', removeTaskWithId)

export default router
