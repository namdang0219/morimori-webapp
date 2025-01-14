import React, { useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { IoAdd } from "react-icons/io5";
import AlbumCarousel from "../../../module/album/AlbumCarousel";
import AlbumSearchModal from "../../../module/album/AlbumSearchModal";
import OptionPopover from "../../../components/popover/OptionPopover";
import AlbumHorizontalList from "../../../components/section/AlbumHorizontalList";
import Header from "../../../components/layout/Header";
import { albumMocks } from "../../../mock/albumMocks";
import SectionTitle from "../../../components/title/SectionTitle";
import { FaChevronRight, FaRegEdit } from "react-icons/fa";
import { userMocks } from "../../../mock/userMocks";
import { IUser } from "../../../util/types/IUser";
import { Drawer } from "antd";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

const AlbumPage = () => {
	const [openCreateAlbumModal, setOpenCreateAlbumModal] =
		useState<boolean>(false);
	const [albumCover, setAlbumCover] = useState<string | null>(null);
	const inputFileRef = React.useRef<HTMLInputElement>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files?.length === 0) {
			if (inputFileRef.current) {
				inputFileRef.current.click();
			}
		}
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file); // Tạo URL tạm thời cho file
			setAlbumCover(url); // Lưu URL vào state
		}
		console.log(e);
	}

	const showDrawer = () => {
		setOpenCreateAlbumModal(true);
	};

	const onClose = () => {
		setOpenCreateAlbumModal(false);
	};

	return (
		<MainLayout>
			{/* header  */}
			<Header
				largeTitle="アルバム"
				rightContainer={
					<>
						<AlbumSearchModal />
						<OptionPopover
							contents={[
								{
									label: "Add New Album",
									onClick: showDrawer,
									icon: <IoAdd size={18} />,
								},
							]}
						/>
					</>
				}
			/>

			{/* drawer create album  */}
			<Drawer
				placement={"bottom"}
				closable={false}
				onClose={onClose}
				open={openCreateAlbumModal}
				key={"createAlbumDrawer"}
				height={"100%"}
				styles={{ body: { padding: 0 } }}
			>
				<div>
					{/* header  */}
					<div className="absolute top-0 left-0 z-40 flex items-center justify-between w-full bg-white h-header-height px-main-padding">
						<span className="w-10" onClick={onClose}>
							<HiOutlineXMark size={24} className="text-danger" />
						</span>
						<span className="text-lg font-medium">
							新規アルバム
						</span>
						<span className="flex w-10">
							<IoMdCheckmark
								size={24}
								className="ml-auto text-green-500"
							/>
						</span>
					</div>

					{/* body  */}
					<div className="pb-20 pt-header-height">
						<div className="w-full relative aspect-[3/4]">
							{albumCover ? (
								<>
									<img
										src={albumCover}
										alt="album-cover"
										className="object-cover object-center w-full h-full"
									/>
									<div className="absolute text-white opacity-80 bottom-5 right-5">
										<label htmlFor="choose-cover">
											<FaRegEdit
												size={30}
												className="shadow-lg"
											/>
											<input
												type="file"
												id="choose-cover"
												ref={inputFileRef}
												onChange={(e) =>
													handleChange(e)
												}
												accept="image/*"
												className="hidden"
											/>
										</label>
									</div>
								</>
							) : (
								<label
									htmlFor="choose-cover"
									className="w-full aspect-[3/4] bg-gray-200"
								>
									<div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
										<span>
											<LuImagePlus size={50} />
										</span>
										<div>アルバム画像を選択123</div>
										<input
											type="file"
											id="choose-cover"
											ref={inputFileRef}
											onChange={(e) => handleChange(e)}
											accept="image/*"
											className="hidden"
										/>
									</div>
								</label>
							)}
						</div>

						<div className="flex flex-col gap-5 p-main-padding">
							{/* title  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									タイトル
								</p>
								<input
									type="text"
									placeholder="タイトルを入力"
									className="w-full px-4 py-3 border rounded-lg border-primary"
								/>
							</div>

							{/* desc  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									説明
								</p>
								<input
									type="text"
									placeholder="説明を入力"
									className="w-full px-4 py-3 border rounded-lg border-primary"
								/>
							</div>

							{/* pick user  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									友達
								</p>
								<div className="grid grid-cols-4 gap-3">
									{Array(5)
										.fill(0)
										.map((item, index) => (
											<div
												key={index}
												className="relative flex-1"
											>
												<img
													src="https://i.pinimg.com/736x/69/b6/c9/69b6c939d19b9befede02bce32fb1b5f.jpg"
													alt="friend-cover-img"
													className="object-cover object-center w-full h-full rounded-full"
												/>
												<div className="absolute top-0 right-0 flex items-center justify-center w-6 bg-white rounded-full shadow-lg aspect-square">
													<FaXmark
														size={18}
														className="text-gray-400"
													/>
												</div>
											</div>
										))}

									<div className="relative flex items-center justify-center flex-1 bg-gray-200 rounded-full">
										<BsPlus
											size={40}
											className="text-gray-400"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Drawer>

			{/* main  */}
			<div className="flex flex-col gap-6 overflow-y-scroll pb-28 h-svh pt-header-height">
				{/* carousel  */}
				<AlbumCarousel />
				{/* recently album  */}
				<AlbumHorizontalList
					title="最近のアルバム"
					contents={albumMocks}
					seeMoreHref="/"
				/>

				<div>
					<div className="flex items-center justify-between mb-2 px-main-padding">
						<SectionTitle>友達と</SectionTitle>
						<button className="flex items-center gap-1 text-sm text-gray-400">
							すべて
							<span>
								<FaChevronRight size={14} />
							</span>
						</button>
					</div>

					<div className="flex items-center gap-3 px-main-padding">
						{userMocks.length > 0 &&
							userMocks.slice(0, 4).map((item: IUser, index) => (
								<div
									key={index}
									className="w-full overflow-hidden bg-gray-200 rounded-full aspect-square"
								>
									{item.photoURL && (
										<img
											src={item.photoURL}
											alt="user-avatar"
											className="object-cover object-center w-full h-full"
										/>
									)}
								</div>
							))}
					</div>
				</div>
				<AlbumHorizontalList
					title="お気に入り"
					contents={albumMocks}
					seeMoreHref="/"
				/>

				<div>
					<SectionTitle className="mb-3 text-lg font-medium text-center">
						#タグ
					</SectionTitle>
					<div className="grid grid-cols-2 gap-2 px-main-padding">
						{Array(4)
							.fill(0)
							.map((item, index) => (
								<div
									key={index}
									className="h-[68px] rounded-xl relative overflow-hidden bg-cover bg-center"
									style={{
										backgroundImage: `url(https://i.pinimg.com/736x/90/8a/d5/908ad508db4da34dd48ff2553d52158a.jpg)`,
									}} // add background
								>
									<div className="absolute inset-0 bg-black bg-opacity-30" />
									<span className="absolute z-20 text-lg font-medium text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
										#家族
									</span>
								</div>
							))}
					</div>
				</div>

				<p className="mt-4 text-sm text-center text-gray-400">
					{`${albumMocks.length}アルバム、100写真`}
				</p>
			</div>
		</MainLayout>
	);
};

export default AlbumPage;
