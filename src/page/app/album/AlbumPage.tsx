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
import { FaChevronRight } from "react-icons/fa";
import { userMocks } from "../../../mock/userMocks";
import { IUser } from "../../../util/types/IUser";

import { IAlbum } from "../../../util/types/IAlbum";

import useAlbums from "../../../hook/useAlbums";
import CreateAlbumModal from "../../../module/album/CreateAlbumModal";

const AlbumPage = () => {
	const { albums } = useAlbums();

	const [openCreateAlbumModal, setOpenCreateAlbumModal] =
		useState<boolean>(false);

	const showDrawer = () => {
		setOpenCreateAlbumModal(true);
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
			<CreateAlbumModal
				open={openCreateAlbumModal}
				setOpen={setOpenCreateAlbumModal}
			/>

			{/* main  */}
			<div className="flex flex-col gap-6 overflow-y-scroll pb-28 h-svh pt-header-height">
				{/* carousel  */}
				<AlbumCarousel />
				{/* recently album  */}
				<AlbumHorizontalList
					title="最近のアルバム"
					contents={albums}
					seeMoreHref="/"
				/>

				<div>
					<div className="flex items-center justify-between mb-2 px-main-padding">
						<SectionTitle>友達と</SectionTitle>
						<button className="flex flex-row items-center gap-1 text-sm text-gray-400">
							<span className="ml-auto">すべて</span>
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
					contents={albums.filter(
						(album: IAlbum) => album.favorite === true
					)}
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
