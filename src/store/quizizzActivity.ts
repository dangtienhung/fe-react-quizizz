import {
	IQuizizzActivityInfo,
	QuizizzActivityAction,
	QuizizzActivityState,
} from './types/quizizzActivity';
import { devtools, persist } from 'zustand/middleware';

import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type';
import { create } from 'zustand';
import { getAllQuizExamActivity } from '@/api/quizActivity';

export const useQuizizzActivityStore = create<
	QuizizzActivityState & QuizizzActivityAction
>()(
	devtools(
		persist(
			(set) => ({
				quizizzActivities: [],
				quizizzActivitie: {} as IQuizizzActivity,
				isLoading: false,
				error: '',
				/* get all activity */
				getAllQuizActivity: async ({
					userId,
					roomId,
				}: IQuizizzActivityInfo) => {
					try {
						set({ isLoading: true });
						const data = await getAllQuizExamActivity({ userId, roomId });
						if (data) {
							set({ quizizzActivities: data });
						}
					} catch (error: any) {
						set({ isLoading: false, error: error });
					}
				},
			}),
			{
				name: 'quizizzActivity',
			}
		)
	)
);
