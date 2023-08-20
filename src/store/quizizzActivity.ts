import { IQuizizzActivityInfo, QuizizzActivityAction, QuizizzActivityState } from './types/quizizzActivity'
import { devtools, persist } from 'zustand/middleware'
import { getAllQuizActivitiesByUserId, getAllQuizExamActivity, getOneQuizExamActivity } from '@/api/quizActivity'

import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { create } from 'zustand'

export const useQuizizzActivityStore = create<QuizizzActivityState & QuizizzActivityAction>()(
  devtools(
    persist(
      (set) => ({
        quizizzActivities: [],
        quizizzActivitie: {} as IQuizizzActivity,
        isLoading: false,
        error: '',
        /* get all activity */
        getAllQuizActivity: async ({ userId, roomId }: IQuizizzActivityInfo) => {
          try {
            set({ isLoading: true })
            const data = await getAllQuizExamActivity({ userId, roomId })
            if (data) {
              set({ quizizzActivities: data })
            }
          } catch (error: any) {
            set({ isLoading: false, error: error })
          }
        },
        /* get one */
        getOneQuizActivity: async (roomId: string) => {
          try {
            set({ isLoading: true })
            const data = await getOneQuizExamActivity(roomId)
            if (data) {
              set({ quizizzActivitie: data })
            }
          } catch (error: any) {
            set({ isLoading: false, error: error })
          }
        },
        getAllQuizActivityByUserId: async (userId: string, _page: number = 1, _limit: number = 4) => {
          try {
            set({ isLoading: true })
            const data = await getAllQuizActivitiesByUserId(userId, _page, _limit)
            if (data) {
              set({ quizizzActivities: data })
            }
          } catch (error: any) {
            set({ isLoading: false, error: error })
          }
        }
      }),
      {
        name: 'quizizzActivity'
      }
    )
  )
)
