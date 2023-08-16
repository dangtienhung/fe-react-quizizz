import {
	IQuizizzQuestionExam,
	IQuizizzsQuestion,
} from '@/interfaces/quizizzExam.type';
import { useEffect, useState } from 'react';

import { AnswerResult } from '../interface/answerResult';
import CardGame from './CardGame';
import Header from '../../components/Header';
import { io } from 'socket.io-client';
import { userStore } from '@/store/userStore';

interface GameSoloProps {
	questions: IQuizizzQuestionExam[];
}

const cardGameList = [
	{ bgColor: '#2F6DAE', boxShadow: '#214E7C' },
	{ bgColor: '#2C9CA6', boxShadow: '#1F6D74' },
	{ bgColor: '#EEB243', boxShadow: '#C68612' },
	{ bgColor: '#D4546A', boxShadow: '#BA2F47' },
];

const GameSolo = ({ questions }: GameSoloProps) => {
	let cardClasses =
		'rounded text-white transition-all duration-500 text-center cursor-pointer hover:bg-opacity-95';
	const [socket, setSocket] = useState<any>(null);
	const [quetionsList, setQuestionsList] = useState<IQuizizzsQuestion[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answerResult, setAnswerResult] = useState<AnswerResult>(null as any);
	const [selectAnswer, setSelectAnswer] = useState<{
		id: string;
		index: number;
	}>(null as any);

	const { user } = userStore((state) => state);
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
	// Xử lý khi nhận được kết quả từ server
	useEffect(() => {
		if (!socket) return;
		socket.on('answerResult', (data: AnswerResult) => {
			if (selectAnswer) {
				const result = data.answer._id === selectAnswer.id;
				setAnswerResult(data);
			}
			setTimeout(() => {
				const nextQuestion = currentQuestion + 1;
				if (nextQuestion < quetionsList.length) {
					setCurrentQuestion(nextQuestion);
				}
				setAnswerResult(null as any);
				setSelectAnswer(null as any);
			}, 2000);
		});
		return () => {
			socket.off('answerResult');
		};
	}, [socket, selectAnswer]);

	/* sử lý sự kiện chọn đáp án */
	const handleAnswerOptionClick = ({
		id,
		index,
	}: {
		id: string;
		index: number;
	}) => {
		const data = { id, index };
		setSelectAnswer(data);
		socket.emit('answerSubmitted', {
			userId: user._id,
			quizizzExamQuestionId: quetionsList[currentQuestion]?._id,
			quizizzExamQuestionAnswerId: id,
		});
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
					<div className="h-1/2 md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4">
						{quetionsList[currentQuestion].questionAnswers.map(
							(card, index) => {
								if (selectAnswer === null) {
									return (
										<div
											key={card._id}
											className={`${cardClasses}`}
											style={{
												boxShadow: `${cardGameList[index].boxShadow} 0px 6px 0px 0px`,
												backgroundColor: `${cardGameList[index].bgColor}`,
											}}
											onClick={() =>
												handleAnswerOptionClick({ id: card._id, index })
											}
										>
											<div
												className={`flex rounded-t h-full w-full font-medium text-[30px] justify-center items-center`}
											>
												{card.content}
											</div>
										</div>
									);
								}
								if (selectAnswer !== null && answerResult) {
									return (
										<div
											key={card._id}
											className={`${cardClasses} ${
												selectAnswer.index === index ? 'block' : 'invisible'
											}`}
											style={{
												boxShadow: `${cardGameList[index].boxShadow} 0px 6px 0px 0px`,
												backgroundColor: `${cardGameList[index].bgColor}`,
											}}
											onClick={() =>
												handleAnswerOptionClick({ id: card._id, index })
											}
										>
											<div
												className={`${
													selectAnswer.id === answerResult?.answer?._id
														? 'bg-green-500'
														: 'bg-red-500'
												} flex rounded-t h-full w-full font-medium text-[30px] justify-center items-center`}
											>
												{card.content}
											</div>
										</div>
									);
								}
							}
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameSolo;

// <CardGame
// 	index={index}
// 	card={card}
// 	key={card._id}
// 	isCorrect={isCorrect}
// 	handleAnswerOptionClick={handleAnswerOptionClick}
// 	answerResult={answerResult}
// />
