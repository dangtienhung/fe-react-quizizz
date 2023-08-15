export interface AnswerResult {
	result: boolean;
	answer: {
		_id: string;
		content: string;
		isCorrect: boolean;
		createdAt: string;
		updatedAt: string;
		quizz_question: string;
	};
}
