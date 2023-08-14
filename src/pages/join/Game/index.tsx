import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import GameSolo from './components/GameSolo';
import Summary from './components/Summary';
import { useQuizizzExamStore } from '@/store/quizizzExam';

enum GameType {
	SOLO = 'solo',
	SUMMARY = 'summary',
}

const QuizizzGame = () => {
	const [searchParams] = useSearchParams();
	const [gameType, setGameType] = useState<GameType>(GameType.SOLO);
	const { id } = useParams();
	const { quizizzExam, getOneQuizizzExam } = useQuizizzExamStore(
		(state) => state
	);
	useEffect(() => {
		const type = searchParams.get('type');
		if (type) {
			setGameType(type as GameType);
		}
	}, [searchParams]);
	useEffect(() => {
		if (id) {
			getOneQuizizzExam(id);
		}
	}, [getOneQuizizzExam, id]);
	if (gameType === GameType.SUMMARY) {
		return <Summary />;
	}
	return <GameSolo questions={quizizzExam.questions} />;
};

export default QuizizzGame;
