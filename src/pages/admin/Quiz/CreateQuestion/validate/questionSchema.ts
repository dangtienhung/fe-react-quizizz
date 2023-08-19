import * as yup from 'yup'

export const questionSchema = yup.object().shape({
  question: yup.string().required('Câu hỏi không được để trống'),
  answers: yup.array().of(
    yup.object().shape({
      content: yup.string().required('Câu trả lời không được để trống'),
      isCorrect: yup.boolean()
    })
  )
})
