import { IQuizizzExam, IQuizizzExamCreate } from '@/interfaces/quizizzExam.type'

import http from './instance'

/* get all */
export const getAllQuizExam = async () => {
  const response = await http.get('/quizizz-exam/lists')
  return response.data
}

/* get one quiz exam */
export const getOneQuizExam = async (id: string) => {
  const response = await http.get(`/quizizz-exam/detail/${id}`)
  return response.data
}

/* create quiz exam */
export const createQuizizzExam = async (data: IQuizizzExamCreate) => {
  const response = await http.post('/quizizz-exam/create', data)
  return response
}

/* get exam by code */
export const getExamByCode = async (code: string) => {
  try {
    const response = await http.get<IQuizizzExam>(`/quizizz-exam/get-code-exam/${code}`)
    return response.data
  } catch (error) {
    return null
  }
}

/* get exam by questionId */
export const getExamByQuestionId = async (id: string) => {
  const response = await http.get(`/quizizz-exam/get-quizizz-exam-by-question-id/${id}`)
  return response.data
}
