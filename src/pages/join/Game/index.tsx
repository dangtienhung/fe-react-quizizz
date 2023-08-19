import { memo, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import GameSolo from './components/GameSolo';
import { GameType } from '@/interfaces/enum';
import Summary from './components/Summary';
import { useGameType } from '@/hooks/useGameType';
import { useQuizizzActivityStore } from '@/store/quizizzActivity';
import { useQuizizzExamStore } from '@/store/quizizzExam';

const QuizizzGame = () => {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const [room, setRoom] = useState<string | null>(null);
	const gameType = useGameType();
	/* store */
	const { quizizzExam, getOneQuizizzExam } = useQuizizzExamStore(
		(state) => state
	);
	const { getOneQuizActivity } = useQuizizzActivityStore((state) => state);
	useEffect(() => {
		const room = searchParams.get('room');
		if (room) {
			setRoom(room);
			getOneQuizActivity(room);
		}
	}, [searchParams]);

	useEffect(() => {
		if (id) {
			getOneQuizizzExam(id);
		}
	}, [getOneQuizizzExam, id]);
	if (gameType === GameType.SUMMARY && room !== null) {
		return <Summary />;
	}
	if (gameType === GameType.SUMMARY && room === null) {
		return <Summary />;
	}
	return <GameSolo questions={quizizzExam.questions} />;
};

export default memo(QuizizzGame);
