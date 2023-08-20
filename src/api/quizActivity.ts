import { IQuizizzActivityInfo } from '@/store/types/quizizzActivity'
import http from './instance'

export const getAllQuizExamActivity = async ({ userId, roomId }: IQuizizzActivityInfo) => {
  try {
    const response = await http.get(`/quiz-activity/list?useId=${userId}&roomId=${roomId}`)
    if (response && response.data) {
      return response.data
    }
  } catch (error) {
    return error
  }
}

export const getOneQuizExamActivity = async (roomId: string) => {
  try {
    const response = await http.get(`/quiz-activity/${roomId}`)
    if (response && response.data) {
      return response.data
    }
  } catch (error) {
    return error
  }
}

export const getAllQuizActivitiesByUserId = async (userId: string, _page: number = 1, _limit: number = 4) => {
  try {
    const response = await http.get(`/quiz-activity/list-all?userId=${userId}&_page=${_page}&_limit=${_limit}`)
    if (response && response.data) {
      return response.data
    }
  } catch (error) {
    return error
  }
}
