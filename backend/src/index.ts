import cors from 'cors'
import express from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'

import rootRouter from './routes/index.route'
import loggerMiddleware from './middlewares/logging.middleware'

const app = express()
configDotenv()

const { PORT, NEXT_ORIGIN } = process.env

app.use(
	cors({
		origin: NEXT_ORIGIN || 'http://localhost:3000',
		credentials: true,
	})
)
app.use(cookieParser())
app.use(express.json())

// middlewares
app.use(loggerMiddleware)

// routes
app.use('/api/v1', rootRouter)

app.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`)
})
