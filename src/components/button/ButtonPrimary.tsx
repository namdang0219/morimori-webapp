import React from "react";

const ButtonPrimary = ({
	children,
	onClick = () => {},
	className = "",
	type = "button",
	loading = false,
}: {
	children: string;
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit";
	loading?: boolean;
}) => {
	return (
		<button
			className={`w-full h-12 rounded-full bg-primary flex items-center justify-center ${className}`}
			onClick={onClick}
			type={type}
		>
			{!loading ? (
				<span className="font-medium text-white">{children}</span>
			) : (
				<div className="loader"></div>
			)}
		</button>
	);
};

export default ButtonPrimary;
