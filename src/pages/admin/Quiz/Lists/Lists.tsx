import {
	BsCheckSquare,
	BsFillImageFill,
	BsListCheck,
	BsPencilFill,
	BsTrash3,
} from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

import { AiOutlinePlus } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { Dropdown } from 'flowbite-react';
import Header from '../components/Header';
import HeaderQuiz from '../components/HeaderQuiz';
import { IoMdCopy } from 'react-icons/io';
import { useEffect } from 'react';
import { useQuizizzStore } from '@/store/quizizzStore';

const QuizLists = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { getOneQuizizz, quizizz } = useQuizizzStore();
	useEffect(() => {
		if (id) {
			getOneQuizizz(id);
		}
	}, [id, getOneQuizizz]);
	return (
		<>
			<Header quizizz={quizizz} />
			<HeaderQuiz className="left-[40%] max-w-2xl" />
			<div className="flex gap-10 bg-[#F2F2F2] min-h-screen">
				<div className="pt-[calc(124px_+_56px)] flex-1 flex justify-end pb-10">
					<div className="w-full max-w-2xl px-10">
						<div className="flex items-center justify-between my-5">
							<div className="flex items-center gap-1">
								<BsListCheck />
								<span className="text-secondary font-semibold">
									{quizizz.questions.length} câu hỏi
								</span>
							</div>
							<div
								onClick={() => navigate(`/admin/quiz/questions/create/${id}`)}
								className="flex items-center gap-1 py-1 px-2 cursor-pointer rounded bg-[#EDE6F6] font-semibold text-primary"
							>
								<AiOutlinePlus />
								Thêm câu hỏi
							</div>
						</div>
						{quizizz &&
							quizizz.questions.length > 0 &&
							quizizz.questions.flat().map((question, index) => {
								return (
									<div
										className="mb-8 bg-white border rounded-lg select-none"
										key={question._id}
									>
										<div className="">
											<div className="flex bg-[#F9F9F9] rounded-lg p-2 justify-between items-center w-full">
												<div className="flex items-center gap-2">
													<BsCheckSquare />
													<span className="text-sm">Câu hỏi {index + 1}</span>
												</div>
												<div className="flex items-center gap-2">
													<div className="flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
														<CiEdit />
														<span className="text-sm font-semibold">
															Chỉnh sửa
														</span>
													</div>
													<div className="p-1 border rounded cursor-pointer">
														<IoMdCopy size={20} />
													</div>
													<div className="p-1 border rounded cursor-pointer">
														<BsTrash3 size={20} />
													</div>
												</div>
											</div>
											<div className="px-2 py-3">{question.title}</div>
											<div className="relative">
												<div className="before:absolute before:bg-white before:-top-2 before:content-['lựa_chọn_câu_trả_lời'] before:text-black before:px-2 before:text-xs before:left-5 absolute h-[1px] w-[96%] top-0 left-1/2 -translate-x-1/2 bg-[#F2F2F2]"></div>
												<div className={`grid grid-cols-2 gap-4 px-2 py-5`}>
													{question.questionAnswers &&
														question.questionAnswers.map((answer) => (
															<div
																className="flex items-center gap-2 truncate"
																key={answer._id}
															>
																<div
																	className={`flex-shrink-0 w-4 h-4 ${
																		answer.isCorrect
																			? 'bg-green-500'
																			: 'bg-red-500'
																	} rounded-full`}
																></div>
																<p className="text-sm truncate">
																	{answer.content}
																</p>
															</div>
														))}
												</div>
											</div>
											<div className="flex bg-[#F9F9F9] rounded-lg gap-4 p-2 items-center w-full">
												<div className="">
													<Dropdown label={`30 giây`}>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
													</Dropdown>
												</div>
												<div className="">
													<Dropdown label={`1 điểm`}>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
														<div className="">ahihih</div>
													</Dropdown>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<div className="mt-[124px] w-full max-w-sm min-h-screen pr-10">
					<div className="p-4 border rounded-lg">
						<div className="border rounded-lg h-[150px] w-full flex-col flex justify-center items-center">
							<div className="flex items-center bg-[#2D9DA6] text-white rounded-full justify-center w-16 h-16">
								<BsFillImageFill size={36} />
							</div>
							<p className="mx-auto mt-4">Click here to upload image.</p>
						</div>
						<div className="flex items-center justify-between py-2 border-b">
							<h2 className="text-xl font-semibold">Không có tiêu đề</h2>
							<div className="p-2 border rounded">
								<BsPencilFill />
							</div>
						</div>
						<div className="py-4">
							<p className="text-secondary">Tổng điểm</p>
							<p className="">
								1 <span>points</span>
							</p>
							<p className="">
								1 <span>câu hỏi đã được chấm điểm</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QuizLists;
