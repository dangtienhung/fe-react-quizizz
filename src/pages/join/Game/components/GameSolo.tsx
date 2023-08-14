import {
	IQuizizzQuestionExam,
	IQuizizzsQuestion,
} from '@/interfaces/quizizzExam.type';
import { useEffect, useState } from 'react';

import CardGame from './CardGame';
import Header from '../../components/Header';
import { io } from 'socket.io-client';

const cardGameList = [
	{ bgColor: '#2F6DAE', boxShadow: '#214E7C' },
	{ bgColor: '#2C9CA6', boxShadow: '#1F6D74' },
	{ bgColor: '#EEB243', boxShadow: '#C68612' },
	{ bgColor: '#D4546A', boxShadow: '#BA2F47' },
];

interface GameSoloProps {
	questions: IQuizizzQuestionExam[];
}

const GameSolo = ({ questions }: GameSoloProps) => {
	const [socket, setSocket] = useState<any>(null);
	const [quetionsList, setQuestionsList] = useState<IQuizizzsQuestion[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	useEffect(() => {
		const questionList = questions.flat().map((question) => {
			const { questions } = question;
			const result = questions.map((question) => question);
			return result;
		});
		setQuestionsList(questionList.flat());
	}, [questions]);

	/* connect socket */
	useEffect(() => {
		const newSocket = io('http://localhost:8000');
		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
		};
	}, []);

	/* sử lý sự kiện chọn đáp án */
	const handleAnswerOptionClick = (id: string) => {
		console.log(
			'🚀 ~ file: GameSolo.tsx:46 ~ handleAnswerOptionClick ~ id:',
			id
		);
		socket.emit('answerSubmitted', {
			userId: 'ahihi',
			quizizzExamQuestionId: 'quizizzExamQuestionId',
			quizizzExamQuestionAnswerId: 'ahihiih',
		});
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < quetionsList.length) {
			setCurrentQuestion(nextQuestion);
		}
	};

	if (!quetionsList.length) return null;
	return (
		<div className="flex flex-col h-screen bg-black select-none">
			<Header />
			<div className="flex-1 p-2">
				<div className="bg-[#461A42] h-full rounded-2xl p-2">
					<div className="h-1/2">
						<div className="flex items-center justify-center w-full h-full rounded">
							<h2 className="text-white font-medium text-[30px] text-center lg:mb-0 mb-5">
								{quetionsList[currentQuestion]?.title}
							</h2>
						</div>
					</div>
					<div className="h-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{quetionsList[currentQuestion].questionAnswers.map(
							(card, index) => (
								<CardGame
									card={card}
									key={card._id}
									handleAnswerOptionClick={handleAnswerOptionClick}
									className={`!bg-[${cardGameList[index].bgColor}] min-h-16`}
									style={cardGameList[index].bgColor}
									boxShadow={cardGameList[index].boxShadow}
								/>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameSolo;
