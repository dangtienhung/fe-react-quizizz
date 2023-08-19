import { IQuizizz, IQuizizzs } from '../interfaces/quizizz.type'
import { IQuizizzAction, IQuizizzState } from './types/quizizz'
import { createQuiz, getAllQuizs, getOneQuiz } from '../api/quizizz'
import { devtools, persist } from 'zustand/middleware'

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
        },
        /* create quizizz */
        createQuizizz: async (quizizz: IQuizizz) => {
          try {
            set({ isLoading: true })
            const respone = await createQuiz(quizizz)
            console.log('🚀 ~ file: quizizzStore.ts:41 ~ createQuizizz: ~ respone:', respone)
            set({ isLoading: false })
            // set({ quizizz: respone.data })
          } catch (error: any) {
            set({ error: error })
          }
        }
      }),
      {
        name: 'quizizz'
      }
    )
  )
)
