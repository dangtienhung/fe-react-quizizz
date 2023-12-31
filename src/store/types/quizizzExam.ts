import { IQuizizzExam, IQuizizzExamCreate } from '@/interfaces/quizizzExam.type'

export type IQuizizzExamState = {
  quizizzExams: IQuizizzExam[]
  quizizzExam: IQuizizzExam
  isLoading: boolean
  error: string
}

export type IQuizizzExamAction = {
  /* get quizizzs */
  getQuizizzExams: () => void
  /* get one */
  getOneQuizizzExam: (id: string) => void
  /* create quiz exam */
  createQuizizzExam: (data: IQuizizzExamCreate) => void
  /* get exam by questionId */
  getOneQuizzExamByQuestionId: (id: string) => void
  /* get exam by code game */
  getOneQuizExamByCode: (code: string) => Promise<IQuizizzExam>
}
