export const useFilterDuplicate = (data: any) => {
	const seenCombinations = new Set();
	const filteredAnswers: any[] = [];

	data.answers.forEach((answer: any) => {
		const combination = `${answer.question}-${answer.answerSelect}`;
		if (!seenCombinations.has(combination)) {
			seenCombinations.add(combination);
			filteredAnswers.push(answer);
		}
	});
	data.answers = filteredAnswers;
	return data;
};
