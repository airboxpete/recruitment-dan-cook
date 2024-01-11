import mongoose, { Document, Schema } from 'mongoose'
import { z } from 'zod'

export interface Task extends Document {
  summary: string
  description?: string
  status: 'todo' | 'doing' | 'done'
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const taskSchema = new Schema<Task>({
  summary: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  size: { type: String, enum: ['xs', 's', 'm', 'l', 'xl'], required: true },
})

export const taskValidationSchema = z.object({
  summary: z.string(),
  description: z.string().optional(),
  status: z.enum(['todo', 'doing', 'done']),
  size: z.enum(['xs', 's', 'm', 'l', 'xl']),
})

export const TaskModel = mongoose.model<Task>('Task', taskSchema)
