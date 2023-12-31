import { UserAction, UserState } from './types/user'
import { devtools, persist } from 'zustand/middleware'

import { IRegister } from '../interfaces/user.type'
import { create } from 'zustand'
import http from '../api/instance'
import { updateNameInGame } from '@/api/user.api'

export const userStore = create<UserState & UserAction>()(
  devtools(
    persist(
      (set) => ({
        user: {} as any,
        isLoading: false,
        errors: '',
        userIdKickGame: '',
        /* register */
        registerAuth: async (data: IRegister) => {
          try {
            set({ isLoading: true })
            await http.post(`/users/create`, data)
            set({ isLoading: false })
          } catch (error: any) {
            set({ isLoading: false, errors: error.response.data.message })
          }
        },
        /* login */
        loginAuth: async (data: Omit<IRegister, 'name'>) => {
          try {
            set({ isLoading: true })
            const response = await http.post(`/users/login`, data)
            set({ user: response.data.data, isLoading: false })
          } catch (error: any) {
            set({ isLoading: false, errors: error.response.data.message })
          }
        },
        /* update name in game */
        updateNameInGame: async (id: string, name: string) => {
          set({ isLoading: true })
          try {
            await updateNameInGame(id, name)
            set({ isLoading: false })
          } catch (error: any) {
            set({ isLoading: false, errors: error })
          }
        }
      }),
      {
        name: 'user'
      }
    )
  )
)
