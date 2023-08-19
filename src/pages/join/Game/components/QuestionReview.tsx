import { IAnswerActivity } from '@/interfaces/answer.type';

interface QuestionReviewProps {
	answer: IAnswerActivity;
	index: number;
}

const QuestionReview = ({ answer, index }: QuestionReviewProps) => {
	return (
		<div
			className={`bg-[#f2f2f2] text-sm p-4 rounded-lg mb-3 text-left border-l-8 ${
				!answer.answerSelect.isCorrect
					? 'border-l-red-500'
					: 'border-l-green-500'
			}`}
		>
			<div className="text-sm text-[#292a3a] border-b border-b-secondary pb-2">
				<span className="text-sm">{index + 1}. </span>
				<span className="text-sm">{answer?.question?.title}</span>
			</div>
			<div className="pt-3">
				{answer?.question?.questionAnswers.map((answerItem) => (
					<div className="flex items-start gap-2 mb-1" key={answerItem._id}>
						<div
							className={`flex-shrink-0 w-4 h-4 mt-1 rounded-full
								${answerItem._id === answer.answerSelect._id ? 'bg-red-500' : 'bg-[#e5e5e5]'}
								${answerItem._id === answer.answerResult._id ? '!bg-green-500' : ''}
								`}
						></div>
						<span className="text-sm text-[#292a3a] mt-[1px]">
							{answerItem.content}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default QuestionReview;
