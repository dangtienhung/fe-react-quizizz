import { AiOutlinePlus, AiOutlineVideoCamera } from 'react-icons/ai';
import {
	BsCheck,
	BsCheckLg,
	BsFillMicFill,
	BsImageFill,
	BsTrash3,
} from 'react-icons/bs';
import React, { useEffect, useState } from 'react';

import { FaSave } from 'react-icons/fa';
import Header from './components/Header';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { IQuestionAnswer } from '../../../../interfaces/question.type';
import { Link } from 'react-router-dom';

enum QuestionType {
	SINGLE = 'single',
	MULTIPLE = 'multiple',
}

const CreateQuestion = () => {
	/* tạo độ dài mảng */
	const [lengthAnswers, setLengthAnswers] = React.useState<number[]>([
		1, 2, 3, 4,
	]);
	/* setState */
	const [question, setQuestion] = React.useState<string>('');
	const [answers, setAnswers] = useState<IQuestionAnswer[]>(
		lengthAnswers.map((_) => ({
			content: '',
			isCorrect: false,
		}))
	);
	const [time, setTime] = React.useState<number>(30);
	const [point, setPoint] = React.useState<number>(1);
	const [questionType, setQuestionType] = useState<QuestionType>(
		QuestionType.SINGLE
	);
	/* xứ lí xóa bớt câu trả lời khi câu trả lời có độ dài bằng 2 thì không được cho xóa xóa nữa */
	const handleDeleteAnswer = (index: number) => {
		if (lengthAnswers.length === 2) {
			return;
		}
		setAnswers((prev) => prev.filter((_, i) => i !== index));
		setLengthAnswers((prev) => prev.filter((_, i) => i !== index));
	};
	/* thêm câu hỏi vào */
	const handleAddAnswer = (index: number) => {
		if (lengthAnswers.length === 5) {
			return;
		}
		setAnswers((prev) => [...prev, { content: '', isCorrect: false }]);
		setLengthAnswers((prev) => [...prev, index]);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			title: question,
			questionAnswers: answers,
			score: point,
			timer: time,
		};
		console.log('🚀 ~ file: index.tsx:64 ~ handleSubmit ~ data:', data);
	};
	/* check đáp án đúng */
	const handleToggleCorrectAnswer = (index: number) => {
		/* nếu questionType đang là single => chỉ được chọn 1 đáp án, nếu đã chọn rồi thì k được chọn nữa */
		if (questionType === QuestionType.SINGLE) {
			setAnswers((prev: IQuestionAnswer[]) => {
				const updatedAnswers = [...prev];
				updatedAnswers.forEach((answer, i) => {
					if (i === index) {
						updatedAnswers[i].isCorrect = true;
					} else {
						updatedAnswers[i].isCorrect = false;
					}
				});
				return updatedAnswers;
			});
			return;
		}
		/* nếu typeQuestion là multiple thì sẽ được chọn nhiều đáp án */
		setAnswers((prev: IQuestionAnswer[]) => {
			const updatedAnswers = [...prev];
			updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
			return updatedAnswers;
		});
	};
	const handleChangeAnswer = (index: number, content: string) => {
		setAnswers((prev: IQuestionAnswer[]) => {
			const updatedAnswers = [...prev];
			updatedAnswers[index].content = content;
			return updatedAnswers;
		});
		setAnswers((prev) => {
			const updatedExplanations = [...prev];
			updatedExplanations[index].content = content;
			return updatedExplanations;
		});
	};

	/* chọn toggle dạng cậu hỏi có nhiều đáp án hay chỉ có 1 đáp án */
	useEffect(() => {
		if (questionType === QuestionType.SINGLE) {
			setAnswers((prev) => {
				const updatedAnswers = [...prev];
				updatedAnswers.forEach((answer, i) => {
					if (i === 0) {
						updatedAnswers[i].isCorrect = true;
					} else {
						updatedAnswers[i].isCorrect = false;
					}
				});
				return updatedAnswers;
			});
		}
	}, [questionType]);
	return (
		<div className="bg-[#424242] min-h-screen flex flex-col gap-4">
			<Header />
			<form
				autoComplete="off"
				className="flex flex-col flex-1 h-full"
				onSubmit={handleSubmit}
			>
				<div className="flex-1 h-full">
					<div className="h-full w-full max-w-5xl mx-auto p-4 rounded-xl bg-[#461A42] flex flex-col gap-2">
						<div className="border h-1/2 border-[#6B4868] rounded-xl bg-[#281226]">
							<div className="flex w-full gap-2 p-2">
								<div className="bg-[#6B4868] rounded text-white h-[32px] w-[32px] flex justify-center items-center">
									<BsImageFill />
								</div>
								<div className="bg-[#6B4868] rounded text-white h-[32px] w-[32px] flex justify-center items-center">
									<BsFillMicFill />
								</div>
								<div className="bg-[#6B4868] rounded text-white h-[32px] w-[32px] flex justify-center items-center">
									<AiOutlineVideoCamera />
								</div>
							</div>
							<textarea
								cols={30}
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								rows={10}
								placeholder="Câu hỏi"
								style={{ boxShadow: 'none' }}
								className="flex justify-center text-base bg-transparent w-full text-white h-[150px] items-center text-center resize-none rounded-xl border-none outline-none"
							></textarea>
						</div>
						<div className="flex items-center gap-3">
							<div
								className={`grid h-1/2 grid-cols-${lengthAnswers.length} gap-3 transition-all duration-300 flex-1`}
							>
								{lengthAnswers.map((_, index) => (
									<div
										className="w-full bg-[#2D70AE] rounded-xl p-1 transition-all duration-300"
										key={index}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-1">
												<div
													onClick={() => handleDeleteAnswer(index)}
													className={`bg-[#578DBE] ${
														lengthAnswers.length === 2
															? 'disabled cursor-default'
															: ''
													} cursor-pointer rounded-lg text-white h-[24px] w-[24px] flex justify-center items-center`}
												>
													<BsTrash3 size={14} />
												</div>
												<div
													className={`bg-[#578DBE] cursor-pointer rounded-lg text-white h-[24px] w-[24px] flex justify-center items-center`}
												>
													<BsImageFill size={14} />
												</div>
											</div>
											<button
												onClick={() => handleToggleCorrectAnswer(index)}
												type="button"
												className={`h-6 w-6 ${
													questionType === QuestionType.SINGLE
														? 'rounded-full'
														: 'rounded-md'
												} text-white border-2 ${
													answers[index]?.isCorrect ? 'bg-[#00C985]' : ''
												} border-white flex justify-center items-center`}
											>
												<BsCheck />
											</button>
										</div>
										<textarea
											cols={30}
											rows={10}
											placeholder={`Câu trả lời ${index + 1}`}
											value={answers[index].content}
											onChange={(e) =>
												handleChangeAnswer(index, e.target.value)
											}
											style={{ boxShadow: 'none' }}
											className="flex placeholder:text-gray-300 justify-center text-base bg-transparent w-full text-white h-[150px] items-center text-center resize-none rounded-xl border-none outline-none"
										/>
									</div>
								))}
							</div>
							<div
								onClick={() => handleAddAnswer(lengthAnswers.length)}
								className={`bg-[#6B4868] flex-shrink-0 cursor-pointer rounded-lg text-white h-[32px] w-[32px] flex justify-center items-center`}
							>
								<AiOutlinePlus size={24} />
							</div>
						</div>
						<div className="bg-[#281226] flex font-semibold w-fit text-xs p-1 rounded text-white">
							<div
								className={`${
									questionType === QuestionType.SINGLE ? 'bg-[#534151]' : ''
								} px-1 rounded cursor-pointer`}
								onClick={() => setQuestionType(QuestionType.SINGLE)}
							>
								Single correct
							</div>
							<div
								className={`${
									questionType === QuestionType.MULTIPLE ? 'bg-[#534151]' : ''
								} px-1 rounded cursor-pointer`}
								onClick={() => setQuestionType(QuestionType.MULTIPLE)}
							>
								Multiple correct
							</div>
						</div>
					</div>
				</div>
				<div className="h-10 mt-auto bg-[#222222] text-white flex justify-between items-center p-2">
					<div className="flex items-center gap-2">
						<button className="flex gap-1 items-center bg-[#161616] rounded py-1 px-2">
							<HiOutlineLightBulb />
							<span className="text-sm font-semibold capitalize">
								Add answer explanation
							</span>
						</button>
						<div className="dropdown dropdown-top">
							<button
								type="button"
								tabIndex={0}
								className="flex gap-1 items-center bg-[#161616] rounded py-1 px-2"
							>
								<HiOutlineLightBulb />
								<span className="text-sm font-semibold capitalize">
									{time} giây
								</span>
							</button>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu shadow bg-base-100 rounded-lg w-full"
							>
								{Array.from({ length: 3 }).map((_, index: number) => (
									<li
										onClick={() => setTime(index + 30)}
										key={index}
										className="hover:bg-gray-100 p-2 font-semibold text-black cursor-pointer"
									>
										{index + 30} giây
									</li>
								))}
							</ul>
						</div>
						<div className="dropdown dropdown-top">
							<button
								tabIndex={0}
								type="button"
								className="flex gap-1 items-center bg-[#161616] rounded py-1 px-2"
							>
								<BsCheckLg />
								<span className="w-24 text-sm font-semibold capitalize">
									{point} điểm
								</span>
							</button>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu shadow bg-base-100 rounded-lg w-full"
							>
								{Array.from({ length: 20 }).map((_, index: number) => (
									<li
										onClick={() => setPoint(index + 1)}
										key={index}
										className="text-black font-semibold cursor-pointer p-[1px] hover:bg-gray-100"
									>
										{index + 1} điểm
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Link to="/admin/quiz/edit/quizEditId" className="inline-block">
							<button
								type="button"
								className="flex gap-1 items-center bg-[#161616] text-sm font-semibold rounded py-1 px-2"
							>
								Hủy
							</button>
						</Link>
						{/* <Link href={`/admin/quiz/lists`} className="inline-block"> */}
						<button className="flex gap-1 items-center bg-[#161616] rounded py-1 px-2">
							<FaSave />
							<span className="text-sm font-semibold text-white">Lưu</span>
						</button>
						{/* </Link> */}
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateQuestion;
