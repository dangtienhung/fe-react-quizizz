import { IQuizizzExam, IQuizizzExamCreate, IQuizizzQuestionExam } from '@/interfaces/quizizzExam.type'
import { IQuizizzExamAction, IQuizizzExamState } from './types/quizizzExam'
import { createQuizizzExam, getAllQuizExam, getExamByQuestionId, getOneQuizExam } from '@/api/quizExam'
import { devtools, persist } from 'zustand/middleware'

import { create } from 'zustand'

export const useQuizizzExamStore = create<IQuizizzExamState & IQuizizzExamAction>()(
  devtools(
    persist(
      (set) => ({
        quizizzExams: [],
        quizizzExam: {} as IQuizizzExam,
        isLoading: false,
        error: '',
        /* get quizizzs */
        getQuizizzExams: async () => {
          set({ isLoading: true })
          try {
            set({ isLoading: false })
            const data = await getAllQuizExam()
            set({ quizizzExams: data })
          } catch (error: any) {
            set({ isLoading: false })
            set({ error: error.response.data.message })
          }
        },
        /* get one */
        getOneQuizizzExam: async (id: string) => {
          set({ isLoading: true })
          try {
            set({ isLoading: false })
            const data = await getOneQuizExam(id)
            set({ quizizzExam: data })
          } catch (error: any) {
            set({ isLoading: false })
            set({ error: error })
          }
        },
        /* create quiz exam */
        createQuizizzExam: async (data: IQuizizzExamCreate) => {
          set({ isLoading: true })
          try {
            set({ isLoading: false })
            const response = await createQuizizzExam(data)
            set({ quizizzExam: response.data })
          } catch (error: any) {
            set({ isLoading: false })
            set({ error: error.response.data.message })
          }
        },
        /* get exam by questionId */
        getOneQuizzExamByQuestionId: async (id: string) => {
          set({ isLoading: true })
          try {
            const data = await getExamByQuestionId(id)
            set({ isLoading: false })
            set({ quizizzExam: data })
          } catch (error: any) {
            set({ error: error })
            set({ isLoading: false })
          }
        }
      }),
      {
        name: 'quizizzExam'
      }
    )
  )
)
