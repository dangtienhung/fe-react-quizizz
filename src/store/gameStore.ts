import { GameStoreAction, GameStoreState } from './types/gameStore'

import { create } from 'zustand'

export const useGameSolo = create<GameStoreState & GameStoreAction>()((set) => ({
  questions: [],
  selectAnswer: null,
  answerResult: null,
  answers: [],
  scores: [],
  score: 0,
  scoreSort: [],
  rank: 0,
  currentQuestion: Number(localStorage.getItem('currentQuestion')) || 0,
  setCurrentQuestion: (newQuestion: number) => {
    set((state) => ({ ...state, currentQuestion: newQuestion }))
    localStorage.setItem('currentQuestion', String(newQuestion))
  }
}))
