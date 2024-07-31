import { Request, Response } from 'express'
import { prisma } from '../utils/prismaClient'
import { HttpStatusCode } from '../utils/httpStatusCodes'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'

// GET /api/v1/tasks - get all the tasks of a user
export const getTasks = async (request: AuthenticatedRequest, response: Response) => {
	const { id } = request

	try {
		const tasks = await prisma.task.findMany({
			where: { userId: id },
		})

		return response.status(HttpStatusCode.OK).json(tasks)
	} catch (error) {
		response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error}` })
	}
}

// GET /api/v1/tasks/:id - gets a task with ID
export const getTaskWithId = async (request: Request, response: Response) => {
	const { id } = request.params

	try {
		const task = await prisma.task.findFirst({
			where: { id },
		})
		return response.status(HttpStatusCode.OK).json(task)
	} catch (error) {
		response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: `Error fetching task: ${error}` })
	}
}

// POST /api/v1/tasks - adds a task
export const addTask = async (request: AuthenticatedRequest, response: Response) => {
	const { id } = request
	const taskData = request.body

	try {
		const newTask = await prisma.task.create({
			data: { ...taskData, userId: id },
		})

		return response
			.status(HttpStatusCode.CREATED)
			.json({ message: `'${newTask.title}' created successfully`, task: newTask })
	} catch (error: any) {
		return response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: 'Internal server error', error: error.message })
	}
}

// PATCH /api/v1/tasks/:id - edits a task
export const editTaskWithId = async (request: Request, response: Response) => {
	const { id } = request.params
	const { title, description, status, priority, deadline } = request.body

	try {
		const updatedTask = await prisma.task.update({
			where: { id },
			data: { title, description, status, priority, deadline },
		})

		return response
			.status(HttpStatusCode.CREATED)
			.json({ message: `'${updatedTask.title}' edited successfully`, task: updatedTask })
	} catch (error: any) {
		return response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: 'Internal server error', error: error.message })
	}
}

// DELETE /api/v1/tasks/:id - removes a task
export const removeTaskWithId = async (request: Request, response: Response) => {
	const { id } = request.params

	try {
		const deletedTask = await prisma.task.delete({
			where: { id },
		})

		return response
			.status(HttpStatusCode.OK)
			.json({ message: `Deleted '${deletedTask.title}' successfully`, task: deletedTask })
	} catch (error) {
		response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: `Error deleting task: ${error}` })
	}
}
