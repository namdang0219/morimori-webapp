import React from "react";

const ButtonPrimary = ({
	children,
	onClick = () => {},
	className = "",
}: {
	children: string;
	onClick: () => void;
	className?: string
}) => {
	return (
		<button
			className={`w-full h-12 rounded-full bg-primary ${className}`}
			onClick={onClick}
		>
			<span className="font-medium text-white">{children}</span>
		</button>
	);
};

export default ButtonPrimary;
