/* eslint-disable */
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { SignupType } from "../../page/auth/SignupPage";
import { LoginType } from "../../page/auth/LoginPage";

const AuthInput = ({
	register,
	name,
	type = "text",
	placeholder = "",
	errorMessage = "",
}: {
	register: any;
	name: keyof SignupType | keyof LoginType;
	type?: string;
	placeholder?: string;
	errorMessage?: string;
}) => {
	return (
		<div className="relative w-full">
			<input
				type={type}
				placeholder={placeholder}
				className="w-[100%] px-4 py-3 rounded-lg border border-primary "
				{...register(name)}
			/>
			{errorMessage && (
				<span className="absolute text-xs text-danger left-3 -bottom-4">
					{errorMessage}
				</span>
			)}
		</div>
	);
};

export default AuthInput;
