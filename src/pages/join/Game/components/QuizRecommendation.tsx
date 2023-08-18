import { IQuizizzExam } from '@/interfaces/quizizzExam.type';
import { Link } from 'react-router-dom';

interface QuizRecommendationProps {
	quizizzExam: IQuizizzExam;
}

const QuizRecommendation = ({ quizizzExam }: QuizRecommendationProps) => {
	return (
		<Link to={`/join/quiz/${quizizzExam._id}`}>
			<div className="hover:bg-opacity-90 flex items-start gap-2 p-2 cursor-pointer">
				<img
					src="https://yeudayhoc.com/wp-content/uploads/2022/01/8-1.png"
					alt={quizizzExam.title}
					className="rounded-xl object-cover w-20 h-20"
					height={80}
					width={80}
				/>
				<div className="flex-1">
					<h2 className="line-clamp-2 text-base font-medium">
						{quizizzExam.title}
					</h2>
					<span className="text-xs">
						{quizizzExam.questions[0].questions.length} questions
					</span>
				</div>
			</div>
		</Link>
	);
};

export default QuizRecommendation;
