export interface Article {
  id?: string
  title: string
  subtitle: string
  content: string
  author: string
  createdTime: Date
  createdUserId: number
  lastModifiedTime: Date
  lastModifiedUserId: number
}
