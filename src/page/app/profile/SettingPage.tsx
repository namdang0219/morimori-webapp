import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import useUser from "../../../hook/useUser";

const SettingPage = () => {
	const { setCurrentUser } = useUser();

	const handleSignout = async () => {
		try {
			await signOut(auth);
			setCurrentUser(null);
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
						<div
							onClick={handleSignout}
							className="px-3 py-1.5 text-sm cursor-pointer text-white bg-red-500 rounded-md"
						>
							ログアウト
						</div>
					</>
				}
			/>

			<div className="pt-header-height"></div>
		</MainLayout>
	);
};

export default SettingPage;
