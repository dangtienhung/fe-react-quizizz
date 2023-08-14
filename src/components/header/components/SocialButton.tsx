import React from 'react';

interface SocialButtonProps {
	className?: string;
	children?: React.ReactNode;
	imgSrc: string;
	title: string;
}

export default function SocialButton({
	className,
	imgSrc,
	title,
}: SocialButtonProps) {
	return (
		<button
			className={`p-[2px] font-bold text-sm ${className} w-full h-10 flex justify-start cursor-pointer items-center rounded my-2`}
		>
			<span className="h-9 w-9 flex items-center justify-center mr-4 bg-white rounded-sm">
				<img
					src={imgSrc}
					alt="google-logo"
					className="h-[20px] w-[20px] object-fill"
					height={20}
					width={20}
				/>
			</span>
			{title}
		</button>
	);
}
