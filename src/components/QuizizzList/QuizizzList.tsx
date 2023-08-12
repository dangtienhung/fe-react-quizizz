import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const QuizizzList = () => {
	return (
		<div className="mt-[44px]">
			<div className="flex items-center justify-between mb-2">
				<h1 className="text-xl font-medium">Toán</h1>
				<Link
					to={`/join/topic/123`}
					className="px-6 py-1 font-bold bg-[#EEE9F4] rounded text-primary"
				>
					Xem thêm
				</Link>
			</div>
			<div className="md:grid-cols-4 lg:grid-cols-5 grid grid-cols-2 gap-4">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	);
};

export default QuizizzList;
