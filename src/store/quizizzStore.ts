import { IQuizizzAction, IQuizizzState } from './types/quizizz'
import { devtools, persist } from 'zustand/middleware'
import { getAllQuizs, getOneQuiz } from '../api/quizizz'

import { IQuizizzs } from '../interfaces/quizizz.type'
import { create } from 'zustand'

export const useQuizizzStore = create<IQuizizzState & IQuizizzAction>()(
  devtools(
    persist(
      (set) => ({
        quizizzs: [],
        quizizz: {} as IQuizizzs,
        isLoading: false,
        error: '',
        /* get quizizzs */
        getQuizizzs: async () => {
          try {
            set({ isLoading: true })
            const response = await getAllQuizs()
            set({ quizizzs: response.data.data, isLoading: false })
          } catch (error: any) {
            set({ error: error.response.data.message })
          }
        },
        /* get one */
        getOneQuizizz: async (id: string) => {
          try {
            set({ isLoading: true })
            const response = await getOneQuiz(id)
            set({ quizizz: response.data, isLoading: false })
          } catch (error: any) {
            set({ error: error.response.data.message })
          }
        }
      }),
      {
        name: 'quizizz'
      }
    )
  )
)
