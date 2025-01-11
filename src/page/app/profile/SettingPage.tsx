import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";

const SettingPage = () => {
	return (
		<MainLayout navHidden>
			<Header
				backTitle="設定"
				rightContainer={
					<>
						<button className="text-sm text-red-500">
							ログアウト
						</button>
					</>
				}
			/>

            <div className="pt-header-height">

            </div>
		</MainLayout>
	);
};

export default SettingPage;
