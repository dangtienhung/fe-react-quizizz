import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import GameSolo from './components/GameSolo';
import { GameType } from '@/interfaces/enum';
import Summary from './components/Summary';
import { useGameType } from '@/hooks/useGameType';
import { useQuizizzExamStore } from '@/store/quizizzExam';
import { useSocket } from '@/hooks/useSocket';
import { userStore } from '@/store/userStore';

const QuizizzGame = () => {
	const { id } = useParams();
	const gameType = useGameType();
	/* store */
	const { quizizzExam, getOneQuizizzExam } = useQuizizzExamStore(
		(state) => state
	);
	const { user } = userStore((state) => state);
	/* connect socket */
	const socket = useSocket();
	/* lưu quiz đã chơi vào thong tin người dùng */
	useEffect(() => {
		if (!socket) return;
		/* gửi id phòng quiz đang chơi lên server */
		socket.emit('joinRoom', { roomId: id, useId: user._id });
	}, [socket, id]);

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
