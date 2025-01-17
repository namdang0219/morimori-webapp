import React, { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { useNavigate } from "react-router";
import LoginMethod from "../../module/auth/LoginMethod";
import useUser from "../../hook/useUser";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthInput from "../../components/input/AuthInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import logo from "./../../../src/assets/images/auth-logo.png";

export type LoginType = {
	email: string;
	password: string;
};

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email("メールを正しく入力しださい")
		.required("メールを入力しださい"),
	password: Yup.string()
		.required("メールを入力しださい")
		.min(6, "パスワード名を6文字以上入力してください")
		.max(10, "パスワード名を10文字以下入力してください"),
});

const LoginPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const { setCurrentUser } = useUser();

	const {
		handleSubmit,
		register,
		reset,
		formState: { isValid, errors },
	} = useForm<LoginType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(loginSchema),
	});

	const handleLogin = async (values: LoginType) => {
		if (!isValid) return;
		try {
			setLoading(true);
			const credentialUser = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);
			if (credentialUser) {
				setCurrentUser(credentialUser.user);
			}
			setLoading(false);
			reset();
			navigate("/");
		} catch (error: any) {
			console.log(error);
			if (error.code === "auth/invalid-credential") {
				alert("ユーザーが存在していません");
			}
			setLoading(false);
			reset();
		}
	};

	return (
		<MainLayout navHidden>
			<div className="flex flex-col w-screen h-svh px-main-padding">
				<h1 className="mt-10 mb-5 text-2xl font-semibold text-center">
					ログイン
				</h1>

				{/* main container  */}
				<div className="flex flex-col flex-1">
					<div className="flex flex-col flex-1">
						<div className="w-24 mx-auto mb-10 aspect-square">
							<img
								src={logo}
								alt="app-logo"
								className="object-contain object-center w-full h-full"
							/>
						</div>
						<div className="flex flex-col items-center gap-5 mb-4">
							<AuthInput
								name="email"
								register={register}
								placeholder="メール"
								errorMessage={errors.email?.message}
							/>
							<AuthInput
								name="password"
								register={register}
								placeholder="パスワード"
								errorMessage={errors.password?.message}
							/>

							<div className="ml-auto text-sm cursor-pointer text-primary">
								パスワード忘れた？
							</div>
						</div>

						<ButtonPrimary
							loading={loading}
							onClick={handleSubmit(handleLogin)}
						>
							ログイン
						</ButtonPrimary>

						<div className="mt-4 text-sm text-center">
							<span>
								アカウントお持ちでない方？
								<button
									onClick={() => navigate("/signup")}
									className="font-semibold text-primary"
								>
									新規登録
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

export default LoginPage;
