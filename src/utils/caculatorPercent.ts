import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'

export const caculatorPercent = (data: IQuizizzActivity[]) => {
  const result = data.map((item) => {
    const { quizizzExamId, answers } = item
    const totalAnswersIsCorrectTrue = answers.filter((answerCorrectTrue) => {
      return answerCorrectTrue.isCorrect === true
    }).length
    const totalQuestions = quizizzExamId?.questions[0].questions.length
    const percent = Math.round((totalAnswersIsCorrectTrue / totalQuestions) * 100)
    return percent
  })
  return result
}

export const caculatorPercentOfQuizizz = (totalAnswersIsCorrectTrue: number | undefined, totalQuestions: number) => {
  console.log('🚀 ~ file: caculatorPercent.ts:17 ~ caculatorPercentOfQuizizz ~ totalQuestions:', totalQuestions)
  console.log(
    '🚀 ~ file: caculatorPercent.ts:17 ~ caculatorPercentOfQuizizz ~ totalAnswersIsCorrectTrue:',
    totalAnswersIsCorrectTrue
  )
  if (!totalAnswersIsCorrectTrue) return 0
  const percent = Math.round((totalAnswersIsCorrectTrue / totalQuestions) * 100)
  return percent
}
