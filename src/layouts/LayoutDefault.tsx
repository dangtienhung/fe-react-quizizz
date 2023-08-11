import Header from '../components/header/Header';
import React from 'react';

interface LayoutDefaultProps {
	children: React.ReactNode;
}

const LayoutDefault = ({ children }: LayoutDefaultProps) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default LayoutDefault;
