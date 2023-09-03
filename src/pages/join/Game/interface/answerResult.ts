export interface AnswerResult {
  userId: string
  result: boolean
  answer: {
    _id: string
    content: string
    isCorrect: boolean
    createdAt: string
    updatedAt: string
    quizz_question: string
  }
  score: number
  currentQuestion: number
}
