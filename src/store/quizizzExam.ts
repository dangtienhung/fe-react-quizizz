import { IQuizizzExamAction, IQuizizzExamState } from './types/quizizzExam';
import { devtools, persist } from 'zustand/middleware';
import { getAllQuizExam, getOneQuizExam } from '@/api/quizExam';

import { IQuizizzExam } from '@/interfaces/quizizzExam.type';
import { create } from 'zustand';

export const useQuizizzExamStore = create<
	IQuizizzExamState & IQuizizzExamAction
>()(
	devtools(
		persist(
			(set) => ({
				quizizzExams: [],
				quizizzExam: {} as IQuizizzExam,
				isLoading: false,
				error: '',
				/* get quizizzs */
				getQuizizzExams: async () => {
					set({ isLoading: true });
					try {
						set({ isLoading: false });
						const data = await getAllQuizExam();
						set({ quizizzExams: data });
					} catch (error: any) {
						set({ isLoading: false });
						set({ error: error.response.data.message });
					}
				},
				/* get one */
				getOneQuizizzExam: async (id: string) => {
					set({ isLoading: true });
					try {
						set({ isLoading: false });
						const data = await getOneQuizExam(id);
						set({ quizizzExam: data });
					} catch (error: any) {
						set({ isLoading: false });
						set({ error: error.response.data.message });
					}
				},
			}),
			{
				name: 'quizizzExam',
			}
		)
	)
);
