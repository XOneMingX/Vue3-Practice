export interface Todo {
  id?: string
  task: string
  status: TodoStatus
  sequence: number
  createdTime: Date
  createdUserId: number
  lastModifiedTime: Date
  lastModifiedUserId: number
}

export enum TodoStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Archived = 'Archived',
}
