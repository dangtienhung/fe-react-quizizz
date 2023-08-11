import QuizizzList from '../QuizizzList/QuizizzList';
import React from 'react';

interface FeatureQuizizzProps {
	children?: React.ReactNode;
	className?: string;
}
const FeatureQuizizz = ({ children, className }: FeatureQuizizzProps) => {
	return (
		<div className={`p-4 md:p-7 ${className}`}>
			<QuizizzList />
			<QuizizzList />
			<QuizizzList />
		</div>
	);
};

export default FeatureQuizizz;
