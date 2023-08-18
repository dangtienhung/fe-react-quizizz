import { memo, useEffect } from 'react';

import GameSolo from './components/GameSolo';
import { GameType } from '@/interfaces/enum';
import Summary from './components/Summary';
import { useGameType } from '@/hooks/useGameType';
import { useParams } from 'react-router-dom';
import { useQuizizzExamStore } from '@/store/quizizzExam';

const QuizizzGame = () => {
	const { id } = useParams();
	const gameType = useGameType();
	/* store */
	const { quizizzExam, getOneQuizizzExam } = useQuizizzExamStore(
		(state) => state
	);

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

export default memo(QuizizzGame);
