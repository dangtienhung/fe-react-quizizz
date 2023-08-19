import { IQuizizz } from '../interfaces/quizizz.type'
import http from './instance'

/* create quiz */
export const createQuiz = async (quiz: IQuizizz) => {
  return http.post('/quizizz/create', quiz)
}

/* lấy ra các quiz được tạo bởi người dùng */
export const getQuizs = async (id: string, _page: number = 1, _limit: number = 5) => {
  return http.get(`/quizizz/lists/${id}?_page=${_page}&_limit=${_limit}`)
}

/* get All Quiz */
export const getAllQuizs = async (_page: number = 1, _limit: number = 1) => {
  return http.get(`/quizizz/lists?_page=${_page}&_limit=${_limit}`)
}

/* get one quiz */
export const getOneQuiz = async (id: string) => {
  return http.get(`/quizizz/detail/${id}`)
}
