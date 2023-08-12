import CardGame from './CardGame';
import Header from '../../components/Header';
import { IQuizizzQuestion } from '../../../../interfaces/question.type';
import { useState } from 'react';

const cardGameList = [
	{ bgColor: '#2F6DAE', boxShadow: '#214E7C' },
	{ bgColor: '#2C9CA6', boxShadow: '#1F6D74' },
	{ bgColor: '#EEB243', boxShadow: '#C68612' },
	{ bgColor: '#D4546A', boxShadow: '#BA2F47' },
];

interface GameSoloProps {
	questions: IQuizizzQuestion[];
}

const GameSolo = ({ questions }: GameSoloProps) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);
	console.log('🚀 ~ file: GameSolo.tsx:17 ~ GameSolo ~ questions:', questions);
	return (
		<div className="flex flex-col h-screen bg-black select-none">
			<Header />
			<div className="flex-1 p-2">
				<div className="bg-[#461A42] h-full rounded-2xl p-2">
					<div className="h-1/2">
						<div className="flex items-center justify-center w-full h-full rounded">
							<h2 className="text-white font-medium text-[30px] text-center">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quibusdam, facere sunt fugit exercitationem dolor minus et
								suscipit aliquid corporis cumque non dignissimos. Ex quisquam
								labore voluptas repellendus omnis voluptatibus consequuntur.
							</h2>
						</div>
					</div>
					<div className="h-1/2 grid grid-cols-4 gap-2">
						{/* <CardGame className="bg-[#2F6DAE]" boxShadow="#214E7C" />
						<CardGame className="bg-[#2C9CA6]" boxShadow="#1F6D74" />
						<CardGame className="bg-[#EEB243]" boxShadow="#C68612" />
						<CardGame className="bg-[#D4546A]" boxShadow="#BA2F47" /> */}
						{cardGameList.map((card, index) => (
							<CardGame
								key={index}
								className={`bg-[${card.bgColor}]`}
								boxShadow={card.boxShadow}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameSolo;
