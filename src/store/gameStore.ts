import { GameStoreAction, GameStoreState } from './types/gameStore';

import { create } from 'zustand';

export const useGameSolo = create<GameStoreState & GameStoreAction>(
	(set, get) => ({
		questions: [],
		selectAnswer: null,
		answerResult: null,
		/* gán biến */
	})
);
