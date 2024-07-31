import { NextFunction, Request, Response } from 'express'

import { taskSchema, taskType } from '../utils/schemas'
import { HttpStatusCode } from '../utils/httpStatusCodes'

export const validatedTask = async (request: Request, response: Response, next: NextFunction) => {
	const taskData: taskType = request.body

	const validatedTask = taskSchema.safeParse(taskData)
	if (!validatedTask.success) {
		return response.status(HttpStatusCode.BAD_REQUEST).json({ errors: validatedTask.error.errors })
	}

	next()
}
