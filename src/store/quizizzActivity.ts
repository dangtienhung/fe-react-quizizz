import {
	QuizizzActivityAction,
	QuizizzActivityState,
} from './types/quizizzActivity';
import { devtools, persist } from 'zustand/middleware';

import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type';
import { create } from 'zustand';

export const useQuizizzActivityStore = create<
	QuizizzActivityState & QuizizzActivityAction
>()(
	devtools(
		persist(
			(_) => ({
				quizizzActivities: [],
				quizizzActivitie: {} as IQuizizzActivity,
				isLoading: false,
				error: '',
			}),
			{
				name: 'quizizzActivity',
			}
		)
	)
);
