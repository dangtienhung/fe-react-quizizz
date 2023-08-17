import { useEffect, useState } from 'react';

import { GameType } from '@/interfaces/enum';
import { useSearchParams } from 'react-router-dom';

export const useGameType = () => {
	const [searchParams] = useSearchParams();
	const [gameType, setGameType] = useState<GameType>(null as any);
	useEffect(() => {
		const type = searchParams.get('type');
		if (type) {
			setGameType(type as GameType);
		}
	}, [searchParams]);
	return gameType;
};
