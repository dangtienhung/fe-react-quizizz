interface QuizizzQuestionAnswer {
	_id: string;
	content: string;
	isCorrect: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface IQuestionAnswer {
	content: string;
	isCorrect: boolean;
}

export interface QuizizzQuestion {
	_id: string;
	title: string;
	score: number;
	active: boolean;
	isDeleted: boolean;
	quizizz: string[];
	questionAnswers: QuizizzQuestionAnswer[];
	timer: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateQuizQuestion
	extends Pick<QuizizzQuestion, 'title' | 'score' | 'timer'> {
	questionAnswers: IQuestionAnswer[];
}
