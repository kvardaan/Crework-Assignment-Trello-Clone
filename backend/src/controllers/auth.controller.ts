import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import { Request, Response } from 'express'

import { prisma } from '../utils/prismaClient'
import { authType } from '../utils/schemas'
import { HttpStatusCode } from '../utils/httpStatusCodes'

configDotenv()
const { JWT_SECRET }: any = process.env

export const login = async (request: Request, response: Response) => {
	const userData: authType = request.body
	const user = await prisma.user.findUnique({ where: { email: userData.email } })

	try {
		if (user) {
			const isPasswordValid = await bcrypt.compare(userData.password, user.password)

			if (!isPasswordValid) {
				return response.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Invalid credentials' })
			}

			const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
			response.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
			response.status(HttpStatusCode.OK).json({ message: 'Login successful', token })
		}
	} catch (error: any) {
		response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: `Error: ${error}` })
	}
}

export const logout = async (request: Request, response: Response) => {
	response.clearCookie('token')
	response.status(HttpStatusCode.OK).json({ message: 'Logout successful' })
}
