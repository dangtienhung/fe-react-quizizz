import { IQuizizz, IQuizizzs } from '../interfaces/quizizz.type';

import http from './instance';

/* create quiz */
export const createQuiz = async (quiz: IQuizizz) => {
	return http.post('/quizizz/create', quiz);
};

/* get quizs */
export const getQuizs = async (
	id: string,
	_page: number = 1,
	_limit: number = 10
) => {
	return http.get(`/quizizz/lists/${id}?_page=${_page}&_limit=${_limit}`);
};
