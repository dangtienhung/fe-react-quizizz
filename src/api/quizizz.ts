import { IQuizizz } from '../interfaces/quizizz.type';
import http from './instance';

/* create quiz */
export const createQuiz = async (quiz: IQuizizz) => {
	return http.post('/quizizz/create', quiz);
};
