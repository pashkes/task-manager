export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface TaskDto {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  position: number
}
