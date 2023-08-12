import { Link } from 'react-router-dom';
import { VscClose } from 'react-icons/vsc';

const Header = () => {
	return (
		<div className="h-16 w-full flex justify-between items-center p-4 bg-[#000]">
			<div className="flex items-center gap-4">
				<Link to={'/join/quiz/ahihi'} className="inline-block">
					<div className="cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]">
						<VscClose size={20} />
					</div>
				</Link>
				<div className="cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]">
					<VscClose size={20} />
				</div>
				<div className="h-10 rounded-lg !text-white px-4 flex justify-center items-center bg-[#333]">
					1/13
				</div>
			</div>
			<div className="">hehe</div>
		</div>
	);
};

export default Header;
