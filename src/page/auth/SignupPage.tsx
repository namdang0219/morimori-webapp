import React, { useState } from "react";
import { useNavigate } from "react-router";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import MainLayout from "../../components/layout/MainLayout";
import LoginMethod from "../../module/auth/LoginMethod";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "../../components/input/AuthInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import useUser from "../../hook/useUser";

export type SignupType = {
	username: string;
	email: string;
	password: string;
};

const signupSchema = Yup.object().shape({
	username: Yup.string()
		.required("ユーザー名を入力してください")
		.min(5, "ユーザー名を５文字以上入力してください")
		.max(10, "ユーザー名を10文字以下入力してください"),
	email: Yup.string()
		.email("メールを正しく入力しださい")
		.required("メールを入力しださい"),
	password: Yup.string()
		.required("メールを入力しださい")
		.min(6, "パスワード名を6文字以上入力してください")
		.max(10, "パスワード名を10文字以下入力してください"),
});

const SignupPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const { setCurrentUser } = useUser();

	const {
		handleSubmit,
		register,
		formState: { isValid, errors },
	} = useForm<SignupType>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		resolver: yupResolver(signupSchema),
	});

	const handleSignup = async (values: SignupType) => {
		if (!isValid) return;
		try {
			setLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			const user = userCredential.user;
			if (user) {
				await updateProfile(user, {
					displayName: values.username,
				});
				setCurrentUser(user);
			}
			setLoading(false);
			navigate("/");
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<MainLayout navHidden>
			<div className="flex flex-col w-screen h-svh px-main-padding">
				<h1 className="mt-10 mb-5 text-2xl font-semibold text-center">
					新規登録
				</h1>

				{/* main container  */}
				<div className="flex flex-col flex-1">
					<div className="flex flex-col flex-1">
						<div className="w-24 mx-auto mb-10 aspect-square">
							<img
								src="https://i.pinimg.com/736x/2a/86/6f/2a866fc3b2d4b56e94662f674d602682.jpg"
								alt="app-logo"
								className="object-cover object-center w-full h-full"
							/>
						</div>
						<form className="flex flex-col items-center gap-5">
							<AuthInput
								name="username"
								placeholder="ユーザー名"
								register={register}
								errorMessage={errors.username?.message}
							/>
							<AuthInput
								name="email"
								placeholder="メール"
								register={register}
								errorMessage={errors.email?.message}
							/>
							<AuthInput
								name="password"
								placeholder="パスワード"
								register={register}
								errorMessage={errors.password?.message}
							/>
							<ButtonPrimary
								type="submit"
								onClick={handleSubmit(handleSignup)}
								loading={loading}
							>
								登録
							</ButtonPrimary>
						</form>

						<div className="mt-4 text-sm text-center">
							<span>
								既にアカウントをお持ちの方？
								<button
									onClick={() => navigate("/login")}
									className="font-semibold text-primary"
								>
									ログイン
								</button>
							</span>
						</div>
					</div>

					{/* login method */}
					<LoginMethod />
				</div>
			</div>
		</MainLayout>
	);
};

export default SignupPage;
