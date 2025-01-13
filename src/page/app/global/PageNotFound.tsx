import React from "react";
import pageNotFound from "./../../../assets/images/pageNotFound.png";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";

const PageNotFound = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<div className="flex flex-col items-center justify-center h-svh">
			<button
				onClick={goBack}
				className="absolute flex items-center justify-center w-12 bg-gray-100 rounded-full top-6 left-6 aspect-square"
			>
				<GoArrowLeft className="text-gray-500" size={25} />
			</button>

			<img
				src={pageNotFound}
				alt="page-not-found"
				className="object-cover object-center w-2/3 aspect-square rotate-[25deg]"
			/>
			<span className="text-xl">404 ページが存在していない</span>
			<button
				className="mt-2 text-sm underline text-primary"
				onClick={goBack}
			>
				戻る
			</button>
		</div>
	);
};

export default PageNotFound;
