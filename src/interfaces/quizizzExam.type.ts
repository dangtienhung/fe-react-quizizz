import { UserActivity } from './user.type'

export interface IQuizizzsAnswer {
  _id: string
  content: string
}

export interface IQuizizzsQuestion {
  _id: string
  title: string
  score: number
  questionAnswers: IQuizizzsAnswer[]
  timer: number
}

export interface IQuizizzQuestionExam {
  _id: string
  questions: IQuizizzsQuestion[]
}

export interface IQuizizzExam {
  _id: string
  title: string
  code: string
  user: UserActivity[]
  questions: IQuizizzQuestionExam[]
  isPublic: boolean
  plays: number
  isDeleted: boolean
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

/* create */
export interface IQuizizzExamCreate {
  title: string
  questions: string[]
  thumbnail?: string
  user: string[]
  code: string
}

export interface IQuizizzExamActivity {
  _id: string
  title: string
  startDate: string
  endDate: string
  questions: IQuizizzQuestionExam[]
}
