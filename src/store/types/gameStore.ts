import { AnswerResult } from '@/pages/join/Game/interface/answerResult';
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type';

type SelectAnswer = { index: number; id: string };

export type GameStoreState = {
	questions: IQuizizzsQuestion[];
	selectAnswer: null | SelectAnswer;
	answerResult: null | AnswerResult;
};

export type GameStoreAction = {
	type: 'SET_QUESTIONS';
	payload: IQuizizzsQuestion[];
};
