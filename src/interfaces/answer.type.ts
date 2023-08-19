export interface IAnswer {
  _id: string
  content: string
  isCorrect: boolean
}

export interface IAnswerActivity {
  answerSelect: {
    _id: string
    content: string
    isCorrect: boolean
  }
  question: {
    _id: string
    title: string
    questionAnswers: IAnswer[]
  }
  isCorrect: boolean
  score: number
  answerResult: {
    _id: string
    content: string
    isCorrect: boolean
  }
  _id: string
  createdAt: string
  updatedAt: string
}
