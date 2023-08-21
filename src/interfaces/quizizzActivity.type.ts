import { IAnswerActivity } from './answer.type'
import { IQuizizzExamActivity } from './quizizzExam.type'
import { UserActivity } from './user.type'

export interface IQuizizzActivity {
  _id: string
  quizizzExamId: IQuizizzExamActivity
  userId: UserActivity
  answers: IAnswerActivity[]
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}
