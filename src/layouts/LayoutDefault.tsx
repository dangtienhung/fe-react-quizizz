import Footer from '../components/Footer/Footer';
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
			<Footer />
		</div>
	);
};

export default LayoutDefault;
