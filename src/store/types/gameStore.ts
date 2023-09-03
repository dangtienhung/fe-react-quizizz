import { AnswerResult } from '@/pages/join/Game/interface/answerResult'
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type'

export type SelectAnswer = { index: number; id: string }

export type GameStoreState = {
  questions: IQuizizzsQuestion[]
  quizActivityId: string
  selectAnswer: SelectAnswer | null
  answerResult: AnswerResult | null
  currentQuestion: number
  answers: any[]
  scores: any[]
  score: number
  rank: number | null
  scoreSort: AnswerResult[]
  totalScores: AnswerResult[]
  answersResult: AnswerResult[]
}

export type GameStoreAction = {
  setCurrentQuestion: (newQuestion: number) => void
}
