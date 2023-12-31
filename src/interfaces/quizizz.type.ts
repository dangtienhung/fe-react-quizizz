import { EStatus } from './enum'
import { IQuizizzQuestion } from './question.type'
import { IUser } from './user.type'

export interface IQuizizz {
  title: string
  questions: []
  user: string
}

export interface IQuizizzs {
  _id: string
  image?: string
  title: string
  slug: string
  questions: IQuizizzQuestion[]
  user: IUser
  status: EStatus
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
