export interface IQuizizzsAnswer {
	_id: string;
	content: string;
}

export interface IQuizizzQuestionExam {
	_id: string;
	questions: [
		{
			_id: string;
			title: string;
			score: number;
			questionAnswers: IQuizizzsAnswer[];
			timer: number;
		}
	];
}

export interface IQuizizzExam {
	_id: string;
	title: string;
	user: [];
	questions: IQuizizzQuestionExam[];
	isPublic: boolean;
	plays: number;
	isDeleted: boolean;
	startDate: string;
	endDate: string;
	createdAt: string;
	updatedAt: string;
}
