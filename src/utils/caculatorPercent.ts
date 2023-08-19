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
