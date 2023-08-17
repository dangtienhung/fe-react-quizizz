import { AnswerResult } from '../interface/answerResult';
import { IQuizizzsAnswer } from '@/interfaces/quizizzExam.type';

interface CardGameProps {
	className?: string;
	card: IQuizizzsAnswer;
	handleAnswerOptionClick: ({
		id,
		index,
	}: {
		id: string;
		index: number;
	}) => void;
	answerResult: AnswerResult;
	index: number;
	isCorrect: boolean;
}

const cardGameList = [
	{ bgColor: '#2F6DAE', boxShadow: '#214E7C' },
	{ bgColor: '#2C9CA6', boxShadow: '#1F6D74' },
	{ bgColor: '#EEB243', boxShadow: '#C68612' },
	{ bgColor: '#D4546A', boxShadow: '#BA2F47' },
];

const CardGame = ({
	card: { _id, content },
	handleAnswerOptionClick,
	answerResult,
	index,
	isCorrect,
}: CardGameProps) => {
	let cardClasses =
		'rounded text-white transition-all duration-500 text-center cursor-pointer hover:bg-opacity-95';
	if (answerResult !== null) {
		if (answerResult.answer._id === _id) {
			if (answerResult.result === true) {
				cardGameList[index].bgColor = '#62C370';
				cardGameList[index].boxShadow = '#62C370';
			}
		} else {
			if (isCorrect === false) {
				cardGameList[index].bgColor = '#D4546A';
				cardGameList[index].boxShadow = '#BA2F47';
			}
		}
	}
	const handleClick = ({ id, index }: { id: string; index: number }) => {
		handleAnswerOptionClick({ id, index });
	};
	return (
		<div
			className={`${cardClasses}`}
			style={{
				boxShadow: `${cardGameList[index].boxShadow} 0px 6px 0px 0px`,
				backgroundColor: `${cardGameList[index].bgColor}`,
			}}
			onClick={() => handleClick({ id: _id, index })}
		>
			<div
				className={`flex rounded-t h-full w-full font-medium text-[30px] justify-center items-center`}
			>
				{content}
			</div>
		</div>
	);
};

export default CardGame;
