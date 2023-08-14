const QuestionReview = () => {
	return (
		<div className="bg-[#f2f2f2] text-sm p-4 rounded-lg mb-3 text-left">
			<div className="text-sm text-[#292a3a] border-b border-b-secondary pb-2">
				<span className="text-sm">1. </span>
				<span className="text-sm">
					Lorem ipsum dolor sit amet. Nhấp vào các câu hỏi để xem câu trả lời
				</span>
			</div>
			<div className="pt-3">
				<div className="flex items-start gap-3 mb-1">
					<div className="flex-shrink-0 w-4 h-4 mt-1 bg-gray-200 rounded-full"></div>
					<span className="text-sm text-[#292a3a]">
						Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Magni reiciendis quas est, doloremque veniam
						tempora porro minus necessitatibus eos vitae.
					</span>
				</div>
				<div className="flex items-start gap-3 mb-1">
					<div className="flex-shrink-0 w-4 h-4 mt-1 bg-gray-200 rounded-full"></div>
					<span className="text-sm text-[#292a3a]">
						Lorem ipsum dolor sit amet.
					</span>
				</div>
				<div className="flex items-start gap-3 mb-1">
					<div className="flex-shrink-0 w-4 h-4 mt-1 bg-gray-200 rounded-full"></div>
					<span className="text-sm text-[#292a3a]">
						Lorem ipsum dolor sit amet.
					</span>
				</div>
			</div>
		</div>
	);
};

export default QuestionReview;
