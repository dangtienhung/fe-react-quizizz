import { Link, useParams } from 'react-router-dom';

import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type';
import { VscClose } from 'react-icons/vsc';
import { useGameType } from '@/hooks/useGameType';

interface HeaderProps {
	quetionsList?: IQuizizzsQuestion[];
	currentQuestion?: number;
}

const Header = ({ quetionsList, currentQuestion }: HeaderProps) => {
	const { id } = useParams();
	const gameType = useGameType();
	return (
		<div className="h-16 w-full flex justify-between items-center p-4 bg-[#000]">
			<div className="flex items-center gap-4">
				<Link
					to={gameType && id ? `/join/quiz/${id}` : '/'}
					className="inline-block"
				>
					<div className="cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]">
						<VscClose size={20} />
					</div>
				</Link>
				<div className="cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]">
					<VscClose size={20} />
				</div>
				{quetionsList && quetionsList.length > 0 && (
					<div className="h-10 rounded-lg !text-white px-4 flex justify-center items-center bg-[#333]">
						{currentQuestion && currentQuestion + 1}/{quetionsList.length}
					</div>
				)}
			</div>
			<div className="">hehe</div>
		</div>
	);
};

export default Header;
