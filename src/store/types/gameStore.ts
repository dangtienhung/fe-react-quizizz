import { AnswerResult } from '@/pages/join/Game/interface/answerResult';
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type';

export type SelectAnswer = { index: number; id: string };

export type GameStoreState = {
	questions: IQuizizzsQuestion[];
	selectAnswer: null | SelectAnswer;
	answerResult: null | AnswerResult;
	currentQuestion: number;
	answers: any[];
};

export type GameStoreAction = {
	setCurrentQuestion: (newQuestion: number) => void;
};
