interface CardGameProps {
	className?: string;
	boxShadow?: string;
	content?: string;
	isCorrect?: boolean;
}

const CardGame = ({
	className,
	boxShadow,
	content,
	isCorrect,
}: CardGameProps) => {
	return (
		<div
			className={`p-[5px] rounded text-white text-center cursor-pointer hover:bg-opacity-95 ${className}`}
			style={{
				boxShadow: `${boxShadow ? boxShadow : '#c68612'} 0px 6px 0px 0px`,
			}}
		>
			<div className="flex h-full w-full font-medium text-[30px] justify-center items-center">
				CardGame
			</div>
		</div>
	);
};

export default CardGame;
