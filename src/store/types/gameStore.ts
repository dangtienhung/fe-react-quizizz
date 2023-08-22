import { AnswerResult } from '@/pages/join/Game/interface/answerResult'
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type'

export type SelectAnswer = { index: number; id: string }

export type GameStoreState = {
  questions: IQuizizzsQuestion[]
  selectAnswer: null | SelectAnswer
  answerResult: null | AnswerResult
  currentQuestion: number
  answers: any[]
  scores: any[]
  score: number
  rank: number | null
  scoreSort: { score: number; id: string }[]
}

export type GameStoreAction = {
  setCurrentQuestion: (newQuestion: number) => void
}
