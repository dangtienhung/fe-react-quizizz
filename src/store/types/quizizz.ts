import { IQuizizz, IQuizizzs } from '../../interfaces/quizizz.type'

export type IQuizizzState = {
  quizizzs: IQuizizzs[]
  quizizz: IQuizizzs
  isLoading: boolean
  error: string
}

export type IQuizizzAction = {
  /* get quizizzs */
  getQuizizzs: () => void
  /* get one */
  getOneQuizizz: (id: string) => void
  /* create quizizz */
  createQuizizz: (quizizz: IQuizizz) => void
}
