const QuizRecommendation = () => {
	return (
		<div className="hover:bg-opacity-90 flex items-start gap-2 p-2 cursor-pointer">
			<img
				src="https://staticg.sportskeeda.com/editor/2022/02/b9427-16438410040408-1920.jpg"
				alt="ahihi"
				className="rounded-xl object-cover w-20 h-20"
				height={80}
				width={80}
			/>
			<div className="flex-1">
				<h2 className="line-clamp-2 text-base font-medium">
					Lorem ipsum dolor sit amet.
				</h2>
				<span className="text-xs">15 questions</span>
			</div>
		</div>
	);
};

export default QuizRecommendation;
