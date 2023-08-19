import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type';

export interface IQuizizzActivityInfo {
	userId: string;
	roomId: string;
}

export type QuizizzActivityState = {
	quizizzActivities: IQuizizzActivity[];
	quizizzActivitie: IQuizizzActivity;
	isLoading: boolean;
	error: string;
};

export type QuizizzActivityAction = {
	getAllQuizActivity: ({ userId, roomId }: IQuizizzActivityInfo) => void;
	getOneQuizActivity: (id: string) => void;
};
