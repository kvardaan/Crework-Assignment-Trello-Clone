import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { prisma } from '../utils/prismaClient'
import { userType } from '../utils/schemas'
import { HttpStatusCode } from '../utils/httpStatusCodes'

// GET /api/v1/users - get all the users
export const getUsers = async (request: Request, response: Response) => {
	try {
		const users = await prisma.user.findMany({
			omit: { password: true },
			include: { tasks: true },
		})

		return response.status(HttpStatusCode.OK).json(users)
	} catch (error) {
		response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error}` })
	}
}

// GET /api/v1/users/:id - gets a user with ID
export const getUserWithId = async (request: Request, response: Response) => {
	const { id } = request.params

	try {
		const user = await prisma.user.findUnique({
			where: { id },
			omit: { password: true },
			include: { tasks: true },
		})
		return response.status(HttpStatusCode.OK).json(user)
	} catch (error) {
		response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: `Error fetching user: ${error}` })
	}
}

// POST /api/v1/users - adds a user
export const addUser = async (request: Request, response: Response) => {
	const userData: userType = request.body

	try {
		const hashedPassword = await bcrypt.hash(userData.password, 12)

		const newUser = await prisma.user.create({
			data: {
				...userData,
				password: hashedPassword,
			},
		})

		return response
			.status(HttpStatusCode.CREATED)
			.json({ message: `'${newUser.name}' created successfully` })
	} catch (error: any) {
		return response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: 'Internal server error', error: error.message })
	}
}

// PATCH /api/v1/users/:id - edits a user info
export const editUserWithId = async (request: Request, response: Response) => {
	const { email, name } = request.body

	try {
		const newUser = await prisma.user.update({
			where: { email },
			data: { name },
		})

		return response
			.status(HttpStatusCode.CREATED)
			.json({ message: `'${newUser.name}' edited successfully` })
	} catch (error: any) {
		return response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: 'Internal server error', error: error.message })
	}
}

// DELETE /api/v1/users/:id - removes a user
export const removeUserWithId = async (request: Request, response: Response) => {
	const { id } = request.params

	try {
		const user = await prisma.user.delete({
			where: { id },
			include: { tasks: true },
		})

		return response
			.status(HttpStatusCode.OK)
			.json({ message: `Deleted '${user.name}' successfully` })
	} catch (error) {
		response
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
			.json({ message: `Error deleting user: ${error}` })
	}
}
