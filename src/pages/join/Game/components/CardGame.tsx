import { IQuizizzsAnswer } from '@/interfaces/quizizzExam.type';

interface CardGameProps {
	className?: string;
	boxShadow?: string;
}

interface CardGameProps {
	card: IQuizizzsAnswer;
	style: string;
	handleAnswerOptionClick: (id: string) => void;
}

const CardGame = ({
	card: { _id, content },
	className,
	boxShadow,
	style,
	handleAnswerOptionClick,
}: CardGameProps) => {
	return (
		<div
			className={`p-[5px] rounded text-white text-center cursor-pointer hover:bg-opacity-95 ${className}`}
			style={{
				boxShadow: `${boxShadow ? boxShadow : '#c68612'} 0px 6px 0px 0px`,
				backgroundColor: `${style ? style : '#eeb243'}`,
			}}
			onClick={() => handleAnswerOptionClick(_id)}
		>
			<div className="flex h-full w-full font-medium text-[30px] justify-center items-center">
				{content}
			</div>
		</div>
	);
};

export default CardGame;
