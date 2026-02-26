import { z } from 'zod'

export const TaskPrioritySchema = z.enum(['low', 'medium', 'high'])
export const TaskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  position: z.number().int(),
})
