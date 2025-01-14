import React from "react";
import pageNotFound from "./../../../assets/images/pageNotFound.png";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import useUser from "../../../hook/useUser";

const PageNotFound = () => {
	const { currentUser } = useUser();

	const navigate = useNavigate();
	const goBack = () => {
		if (currentUser) {
			navigate("/album");
		} else {
			navigate("/login");
		}
		// navigate(-1); // go back to previous page (if available) else go to root route (/) when not authenticated user.
	};

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
				onClick={() => navigate(-1)}
			>
				戻る
			</button>
		</div>
	);
};

export default PageNotFound;
