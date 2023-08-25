import http from './instance'

/* update user in game */
export const updateNameInGame = async (id: string, name: string) => {
  const data = await http.patch(`/users/update-name-in-game/${id}`, { nameInGame: name })
  return data
}
