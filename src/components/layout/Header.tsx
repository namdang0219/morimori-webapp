import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const Header = ({
	largeTitle,
	backTitle,
	rightContainer,
	containerClassName = "",
}: {
	largeTitle?: string;
	backTitle?: string;
	rightContainer?: React.ReactNode;
	containerClassName?: string;
}) => {
	const navigate = useNavigate();

	return (
		<div
			className={`absolute flex z-[1000] items-center justify-between w-full bg-white bg-opacity-75 h-header-height backdrop-blur-2xl px-main-padding ${containerClassName}`}
		>
			{largeTitle && <h1 className="text-3xl">{largeTitle}</h1>}
			{backTitle && (
				<div
					className="flex items-center gap-1"
					onClick={() => navigate(-1)}
				>
					<IoChevronBack size={24} />
					<span className="text-xl">{backTitle}</span>
				</div>
			)}

			<div className="flex items-center gap-4">{rightContainer}</div>
		</div>
	);
};

export default Header;
