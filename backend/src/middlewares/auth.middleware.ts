import { verify, JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { HttpStatusCode } from '../utils/httpStatusCodes'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthenticatedRequest extends Request {
	id?: string
}

export const authMiddleware = (
	request: AuthenticatedRequest,
	response: Response,
	next: NextFunction
) => {
	const authHeader = request.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return response.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Not Authorized' })
	}
	const token = authHeader.split(' ')[1]

	try {
		const decoded = verify(token, JWT_SECRET) as JwtPayload
		if (typeof decoded.id !== 'string') {
			return response.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Invalid Token' })
		}

		request.id = decoded.id
		next()
	} catch (error: any) {
		if (error.name === 'JsonWebTokenError') {
			return response.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Invalid Token' })
		} else if (error.name === 'TokenExpiredError') {
			return response.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Token Expired' })
		} else {
			return response
				.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
				.json({ error: 'Internal Server Error' })
		}
	}
}
