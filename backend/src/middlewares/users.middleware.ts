import { Request, Response, NextFunction } from 'express'

import { prisma } from '../utils/prismaClient'
import { userSchema, userType } from '../utils/schemas'
import { HttpStatusCode } from '../utils/httpStatusCodes'

export const validatedUser = async (request: Request, response: Response, next: NextFunction) => {
	const userData: userType = request.body

	const validatedUser = userSchema.safeParse(userData)
	if (!validatedUser.success) {
		return response.status(HttpStatusCode.BAD_REQUEST).json({ errors: validatedUser.error.errors })
	}

	next()
}

export const userAlreadyExists = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const userData: userType = request.body
	const existingUser = await prisma.user.findUnique({ where: { email: userData.email } })

	if (existingUser) {
		return response.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Email already taken!' })
	}

	next()
}

export const doesUserExists = async (request: Request, response: Response, next: NextFunction) => {
	const { id } = request.params
	const existingUser = await prisma.user.findFirst({ where: { id } })

	if (!existingUser) {
		return response.status(HttpStatusCode.BAD_REQUEST).json({ message: 'User doesnot exist!' })
	}

	next()
}
