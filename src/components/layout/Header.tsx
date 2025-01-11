import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const Header = ({
	largeTitle,
	backTitle,
	rightContainer,
	containerClassName = "bg-white bg-opacity-75 backdrop-blur-2xl",
	backTitleClassName = "text-ios-blue",
}: {
	largeTitle?: string;
	backTitle?: string;
	rightContainer?: React.ReactNode;
	containerClassName?: string;
	backTitleClassName?: string;
}) => {
	const navigate = useNavigate();

	return (
		<div
			className={`absolute flex z-[1000] items-center justify-between w-full  h-header-height px-main-padding ${containerClassName}`}
		>
			{largeTitle && (
				<h1 className="text-2xl font-semibold">{largeTitle}</h1>
			)}
			{backTitle && (
				<div
					className={`flex items-center gap-0.5 ${backTitleClassName}`}
					onClick={() => navigate(-1)}
				>
					<IoChevronBack size={20} />
					<span className="text-lg">{backTitle}</span>
				</div>
			)}

			<div className="flex items-center gap-4">{rightContainer}</div>
		</div>
	);
};

export default Header;
