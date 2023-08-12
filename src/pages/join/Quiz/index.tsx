import { Link, useParams } from 'react-router-dom';

import { BiUserCheck } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import Header from '../components/Header';
import Skeleton from 'react-loading-skeleton';
import { VscDebugStart } from 'react-icons/vsc';
import { useEffect } from 'react';
import { useQuizizzStore } from '../../../store/quizizzStore';

const PreQuiz = () => {
	const { id } = useParams<{ id: string }>();
	const { quizizz, getOneQuizizz, isLoading } = useQuizizzStore(
		(state) => state
	);
	useEffect(() => {
		if (id) {
			getOneQuizizz(id);
		}
	}, [getOneQuizizz, id]);
	return (
		<div className="min-h-screen bg-black">
			<Header />
			<div className="flex justify-between gap-10 p-10 text-white bg-black">
				{isLoading ? (
					<Skeleton count={10} />
				) : (
					<>
						<div className="w-[25%]">
							<div className="p-6 bg-[#111111] rounded-xl">
								<div className="flex items-start w-full gap-3">
									<img
										src={
											quizizz.image ||
											'https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200'
										}
										alt={quizizz.title}
										className="w-[56px] h-[56px] rounded-xl object-cover"
										width={56}
										height={56}
									/>
									<div className="w-full overflow-hidden">
										<p className="text-lg font-medium truncate">
											{quizizz.title}
										</p>
										<span className="text-sm">
											{quizizz.questions.length} Qs
										</span>
									</div>
								</div>
								<div className="mt-4">
									<span className="inline-flex items-center gap-3">
										<BiUserCheck size={20} />
										<span>Qua: {quizizz.user.name}</span>
									</span>
								</div>
							</div>
						</div>
						<div className="w-[50%]">
							<div className="p-6 bg-[#111111] rounded-xl">
								<Link
									to={`/join/game/${quizizz._id}?type=solo`}
									className="inline-block w-full"
								>
									<button
										className="btn shadow-md mb-5 w-full bg-[#00C985] hover:bg-[#00C985] font-bold outline-none border-none text-white"
										style={{ boxShadow: '#00a06a 0px 4px 0px 0px' }}
									>
										<VscDebugStart size={20} />
										<span>Bắt đầu</span>
									</button>
								</Link>
								<button
									className="btn bg-primary hover:bg-primary w-full font-bold text-white border-none shadow-md outline-none"
									style={{ boxShadow: '#6c4298 0px 4px 0px 0px' }}
								>
									<FaUsers size={20} />
									<span>Thách thức bạn bè</span>
								</button>
							</div>
						</div>
						<div className="w-[25%]"></div>
					</>
				)}
			</div>
		</div>
	);
};

export default PreQuiz;
