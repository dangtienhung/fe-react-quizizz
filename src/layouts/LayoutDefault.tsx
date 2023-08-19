import Footer from '../components/Footer/Footer';
import Header from '../components/header/Header';
import React from 'react';
import { Variant } from '@/pages/home';

interface LayoutDefaultProps {
	children: React.ReactNode;
	handleOpenModal: (placement: Variant) => void;
}

const LayoutDefault = ({ children, handleOpenModal }: LayoutDefaultProps) => {
	return (
		<div>
			<Header handleOpenModal={handleOpenModal} />
			{children}
			<Footer />
		</div>
	);
};

export default LayoutDefault;
