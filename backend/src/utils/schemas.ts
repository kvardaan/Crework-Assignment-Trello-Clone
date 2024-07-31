import { z } from 'zod'

export const taskSchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be 5 or more characters long',
	}),
	description: z.string().optional(),
	status: z.enum(['To_do', 'In_progress', 'Under_review', 'Finished'], {
		message: 'Invalid choice',
	}),
	priority: z
		.enum(['Low', 'Medium', 'Urgent'], {
			message: 'Invalid choice',
		})
		.optional(),
	deadline: z.string().optional(),
})

export const userSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	name: z.string().min(5, { message: 'Name must be 5 or more characters long' }),
	password: z.string().min(8, { message: 'Password must be 8 or more characters long' }),
})

export const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export type taskType = z.infer<typeof taskSchema>
export type userType = z.infer<typeof userSchema>
export type authType = z.infer<typeof authSchema>
