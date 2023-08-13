import { IQuizizzExam } from '@/interfaces/quizizzExam.type';

export type IQuizizzExamState = {
	quizizzExams: IQuizizzExam[];
	quizizzExam: IQuizizzExam;
	isLoading: boolean;
	error: string;
};

export type IQuizizzExamAction = {
	/* get quizizzs */
	getQuizizzExams: () => void;
	/* get one */
	getOneQuizizzExam: (id: string) => void;
};
