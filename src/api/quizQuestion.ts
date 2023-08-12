import http from './instance';

/* create question */
export const createQuestion = async (question: any) => {
	return http.post('/quizizz-question/create', question);
};
