import { useState } from 'react'

export const copyCodeGame = (code: string) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  navigator.clipboard.writeText(code)
  setCopySuccess(true)
  setTimeout(() => {
    setCopySuccess(false)
  }, 2500)
  return copySuccess
}
