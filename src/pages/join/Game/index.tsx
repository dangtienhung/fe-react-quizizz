import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import GameSolo from './components/GameSolo';
import Summary from './components/Summary';

enum GameType {
	SOLO = 'solo',
	SUMMARY = 'summary',
}

const QuizizzGame = () => {
	const [searchParams] = useSearchParams();
	const [gameType, setGameType] = useState<GameType>(GameType.SOLO);
	useEffect(() => {
		const type = searchParams.get('type');
		if (type) {
			setGameType(type as GameType);
		}
	}, [searchParams]);
	if (gameType === GameType.SUMMARY) {
		return <Summary />;
	}
	return <GameSolo />;
};

export default QuizizzGame;
