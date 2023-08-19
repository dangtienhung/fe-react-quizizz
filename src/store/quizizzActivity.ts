import { IQuizizzActivityInfo, QuizizzActivityAction, QuizizzActivityState } from './types/quizizzActivity'
import { devtools, persist } from 'zustand/middleware'
import { getAllQuizExamActivity, getOneQuizExamActivity } from '@/api/quizActivity'

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
        }
      }),
      {
        name: 'quizizzActivity'
      }
    )
  )
)
