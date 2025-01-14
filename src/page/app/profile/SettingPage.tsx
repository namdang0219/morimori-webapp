import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router";
import useUser from "../../../hook/useUser";

const SettingPage = () => {
	const navigate = useNavigate();
	const { setCurrentUser } = useUser();

	const handleSignout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MainLayout navHidden>
			<Header
				backTitle="設定"
				rightContainer={
					<>
						<button
							className="text-sm text-red-500"
							onClick={handleSignout}
						>
							ログアウト
						</button>
					</>
				}
			/>

			<div className="pt-header-height"></div>
		</MainLayout>
	);
};

export default SettingPage;
