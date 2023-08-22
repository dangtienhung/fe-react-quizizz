import { AnswerResult } from '@/pages/join/Game/interface/answerResult'
import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type'

export type SelectAnswer = { index: number; id: string }

export type GameStoreState = {
  questions: IQuizizzsQuestion[]
  selectAnswer: null | SelectAnswer
  answerResult: null | AnswerResult
  currentQuestion: number
  answers: any[]
  scores: IQuizizzActivity[]
  score: number
  indexSort: number
  scoreSort: { score: number; id: string }[]
}

export type GameStoreAction = {
  setCurrentQuestion: (newQuestion: number) => void
}
