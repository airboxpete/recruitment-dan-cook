import { type Request, type Response, Router } from 'express'
import { TaskModel, taskValidationSchema } from '../schema'

import { validate } from '../utils/validate'

const tasksRouter = Router()

tasksRouter.get('/', async (_: Request, res: Response) => {
  const tasks = await TaskModel.find({})
  return res.json({ tasks })
})

tasksRouter.get('/:id', async (req: Request, res: Response) => {
  const task = await TaskModel.findById(req.params.id)
  if (!task) return res.status(404).send({ message: 'Task not found' })
  return res.json(task)
})

tasksRouter.post('/', validate(taskValidationSchema), async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.create(req.body)
    return res.json(task)
  } catch (err) {
    console.error(err)
  }
})

tasksRouter.put('/:id', validate(taskValidationSchema), async (req: Request, res: Response) => {
  const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body)
  if (!task) return res.status(404).send({ message: 'Task not found' })
  const updated = await TaskModel.findById(req.params.id)
  return res.json(updated)
})

tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  const task = await TaskModel.findByIdAndDelete(req.params.id)
  if (!task) return res.status(404).send({ message: 'Task not found' })
  return res.json(task)
})

export default tasksRouter
