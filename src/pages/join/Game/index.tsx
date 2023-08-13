import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import GameSolo from './components/GameSolo';
import Summary from './components/Summary';
import { useQuizizzStore } from '@/store/quizizzStore';

enum GameType {
	SOLO = 'solo',
	SUMMARY = 'summary',
}

const QuizizzGame = () => {
	const [searchParams] = useSearchParams();
	const [gameType, setGameType] = useState<GameType>(GameType.SOLO);
	const { id } = useParams();
	const { quizizz, getOneQuizizz } = useQuizizzStore((state) => state);
	useEffect(() => {
		const type = searchParams.get('type');
		if (type) {
			setGameType(type as GameType);
		}
	}, [searchParams]);
	useEffect(() => {
		if (id) {
			getOneQuizizz(id);
		}
	}, [getOneQuizizz, id]);
	if (gameType === GameType.SUMMARY) {
		return <Summary />;
	}
	return <GameSolo questions={quizizz.questions} />;
};

export default QuizizzGame;
