import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import { Tabs, TabsProps } from "antd";
import { imageMocks } from "../../../mock/imageMocks";
import { useNavigate } from "react-router";
import useUser from "../../../hook/useUser";

const onChange = (key: string) => {
	console.log(key);
};

const ProfilePostsTab = () => {
	return (
		<div className="grid grid-cols-3 gap-1">
			{imageMocks.length > 0 &&
				imageMocks.map((item) => (
					<div
						key={item.iid}
						className="w-full overflow-hidden aspect-square"
					>
						<img
							src={item.uri}
							alt="image"
							className="object-cover object-center w-full h-full"
						/>
					</div>
				))}
		</div>
	);
};

const ProfileTagsTab = () => {
	return (
		<div className="grid grid-cols-3 gap-1">
			{imageMocks.length > 0 &&
				imageMocks.slice(0, 5).map((item) => (
					<div
						key={item.iid}
						className="w-full overflow-hidden aspect-square"
					>
						<img
							src={item.uri}
							alt="image"
							className="object-cover object-center w-full h-full"
						/>
					</div>
				))}
		</div>
	);
};

const items: TabsProps["items"] = [
	{
		key: "1",
		label: "投稿",
		children: <ProfilePostsTab />,
	},
	{
		key: "2",
		label: "タグ",
		children: <ProfileTagsTab />,
	},
];

const ProfilePage = () => {
	const navigate = useNavigate();
	const { userData } = useUser();

	if (!userData) {
		navigate("/login");
		return null;
	}

	return (
		<MainLayout>
			<Header
				largeTitle="プロフィール"
				rightContainer={
					<>
						<span>
							<IoQrCodeOutline size={22} />
						</span>
						<span onClick={() => navigate("/setting")}>
							<IoSettingsOutline size={24} />
						</span>
					</>
				}
			/>

			<div className="overflow-y-scroll h-svh pt-header-height">
				{/* avatar  */}
				<div className="bg-violet-600 mt-2 w-[160px] aspect-square p-1 rounded-full flex mx-auto">
					<div className="cursor-pointer w-[152px] aspect-square flex rounded-full overflow-hidden p-1 bg-white flex-1">
						{userData.photoURL ? (
							<img
								src="https://i.pinimg.com/736x/00/85/b6/0085b61bd3f5d216eecf94d3c8d4f110.jpg"
								alt="current-user-avatar"
								className="flex-1 object-cover object-center rounded-full"
							/>
						) : (
							<div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
								<span className="text-[50px] text-gray-400">
									{userData.displayName?.slice(0, 1)}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* user info  */}
				<div className="pt-2 mx-auto text-center">
					<h2 className="text-xl font-semibold">
						{userData?.displayName}
					</h2>
					<p className="text-sm text-gray-400">{userData?.email}</p>

					{/* post and friend number  */}
					<div className="flex justify-center gap-10 mt-2.5">
						<div className="flex flex-col justify-center">
							<span className="font-medium text-gray-400">
								投稿
							</span>
							<span className="text-xl font-semibold">
								{userData?.posts.length}
							</span>
						</div>
						<div className="flex flex-col justify-center">
							<span className="font-medium text-gray-400">
								友達
							</span>
							<span className="text-xl font-semibold">
								{userData?.friends.length}
							</span>
						</div>
					</div>
				</div>

				{/* func button  */}
				<div className="flex items-center justify-center gap-2 mt-2 text-gray-400">
					<button
						className="flex items-center gap-1 px-2 border border-gray-400 rounded"
						onClick={() => navigate("/profile-edit")}
					>
						<span>
							<RiEditBoxLine />
						</span>
						<span>情報を編集</span>
					</button>
					<button className="flex items-center gap-1 px-2 border border-gray-400 rounded">
						<span>
							<CiShare2 />
						</span>
						<span>シェア</span>
					</button>
				</div>

				{/* tabs field  */}
				<div className="mt-2 pb-[100px]">
					<Tabs
						defaultActiveKey="1"
						items={items}
						onChange={onChange}
						centered
					/>
				</div>
			</div>
		</MainLayout>
	);
};

export default ProfilePage;
