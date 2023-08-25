import { IRegister, IUser } from '../../interfaces/user.type'

export type UserState = {
  user: IUser
  isLoading: boolean
  errors: string
}

export type UserAction = {
  /* register */
  registerAuth: (data: IRegister) => void
  /* login */
  loginAuth: (data: IRegister) => void
  /* update name in game */
  updateNameInGame: (id: string, name: string) => void
}
