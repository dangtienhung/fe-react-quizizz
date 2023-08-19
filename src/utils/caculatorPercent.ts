import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type';

export const caculatorPercent = (data: IQuizizzActivity[]) => {
	console.log(
		'🚀 ~ file: caculatorPercent.ts:4 ~ caculatorPercent ~ data:',
		data
	);
	const result = data.map((item) => {
		const { quizizzExamId, answers } = item;
		const totalAnswers = answers.length;
		const totalQuestions = quizizzExamId?.questions[0].questions.length;
		const percent = Math.round((totalAnswers / totalQuestions) * 100);
		return percent;
	});
	return result;
};
