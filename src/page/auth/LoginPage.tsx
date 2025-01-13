import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { useNavigate } from "react-router";
import LoginMethod from "../../module/auth/LoginMethod";

const LoginPage = () => {
	const navigate = useNavigate();
	const handleLogin = () => {};

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
								src="https://i.pinimg.com/736x/2a/86/6f/2a866fc3b2d4b56e94662f674d602682.jpg"
								alt="app-logo"
								className="object-cover object-center w-full h-full"
							/>
						</div>
						<div className="flex flex-col items-center gap-5 mb-4">
							<input
								type="text"
								placeholder="メール"
								className="w-[100%] px-4 py-3 rounded-lg border border-primary "
							/>
							<input
								type="text"
								placeholder="パスワード"
								className="w-[100%] px-4 py-3 rounded-lg border border-primary "
							/>

							<button className="ml-auto text-sm text-primary">
								パスワード忘れた？
							</button>
						</div>

						<ButtonPrimary onClick={handleLogin}>
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
