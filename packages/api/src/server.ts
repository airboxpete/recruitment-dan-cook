import * as OpenApiValidator from 'express-openapi-validator'
import express, { Request, Response } from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import tasksRouter from './routes/tasks'

dotenv.config()

mongoose.connect(process.env.MONGO_URL!, {
  user: process.env.MONGO_USER!,
  pass: process.env.MONGO_PASSWORD!,
})

const app = express()

app.use(
  OpenApiValidator.middleware({
    apiSpec: './spec/task-manager.yaml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
)

app.use(express.json())
app.use(cors())
app.use('/tasks', tasksRouter)

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).send('An unexpected error occurred')
})

export default app
