import { HiUserGroup } from 'react-icons/hi';
import { IQuizizzExam } from '@/interfaces/quizizzExam.type';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { VscDebugStart } from 'react-icons/vsc';
import { useState } from 'react';

interface CardProps {
	quizizzExam: IQuizizzExam;
}

const Card = ({ quizizzExam }: CardProps) => {
	const [openModal, setOpenModal] = useState<string | undefined>();
	const props = { openModal, setOpenModal };
	return (
		<>
			<div
				className="border border-gray-200 rounded-lg shadow cursor-pointer select-none"
				onClick={() => props.setOpenModal('dismissible')}
			>
				<div className="relative h-[126px]">
					<img
						src="https://yeudayhoc.com/wp-content/uploads/2022/01/8-1.png"
						alt={quizizzExam.title}
						className="object-cover w-full h-full rounded-t-lg"
					/>
					<div className="bottom-2 left-2 absolute">
						<div className="text-xs bg-[#f2f2f2] shadow text-[#292a3a] text-center rounded py-[1px] px-[6px]">
							{quizizzExam.questions[0].questions.length} Qs
						</div>
					</div>
				</div>
				<div className="p-3">
					<h2 className="line-clamp-2 text-base font-medium capitalize">
						{quizizzExam.title}
					</h2>
				</div>
			</div>
			<Modal
				dismissible
				show={props.openModal === 'dismissible'}
				onClose={() => props.setOpenModal(undefined)}
				className="!border-0 w-full"
				size={'lg'}
			>
				<div
					className="relative h-[240px] select-none"
					style={{ width: '100%' }}
				>
					<img
						src="https://yeudayhoc.com/wp-content/uploads/2022/01/8-1.png"
						alt="image"
						className="object-cover w-full h-full rounded-t-lg"
					/>
					<div className="bottom-2 left-2 absolute">
						<div className="text-xs bg-[#f2f2f2] shadow text-[#292a3a] text-center rounded py-[1px] px-[6px]">
							{quizizzExam.questions.length} Qs
						</div>
					</div>
				</div>
				<div className="p-3 select-none">
					<h2 className="line-clamp-2 text-base font-medium capitalize">
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
						dolor sit amet.
					</h2>
					<div className="flex items-center justify-start gap-2 my-4">
						<img
							src="https://yeudayhoc.com/wp-content/uploads/2022/01/8-1.png"
							alt="image-avatar"
							className="h-[24px] w-[24px] rounded-full object-cover"
							height={24}
							width={24}
						/>
						<span className="">Đặng Tiến Hưng</span>
					</div>
					<div className="flex items-center justify-between gap-4">
						<Link
							to={`/join/quiz/${quizizzExam._id}`}
							className="inline-block w-full border-none outline-none"
						>
							<button className="btn bg-primary hover:bg-primary w-full text-white border-0 outline-none">
								<span>Thực hành</span>
								<VscDebugStart size={20} />
							</button>
						</Link>
						<Link to={`/`} className="inline-block w-full">
							<button className="btn bg-primary hover:bg-primary flex items-center justify-between w-full text-white border-0 outline-none">
								<span className="flex-1">Thách thức bạn bè</span>
								<HiUserGroup size={20} />
							</button>
						</Link>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Card;
