import http from './instance';

/* get all */
export const getAllQuizExam = async () => {
	const response = await http.get('/quizizz-exam/lists');
	return response.data;
};

/* get one quiz exam */
export const getOneQuizExam = async (id: string) => {
	const response = await http.get(`/quizizz-exam/detail/${id}`);
	return response.data;
};
