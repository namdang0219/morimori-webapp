import React, { useEffect, useState } from "react";
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
import { IUser } from "../../../util/types/IUser";

import { IAlbum } from "../../../util/types/IAlbum";

import useAlbums from "../../../hook/useAlbums";
import CreateAlbumModal from "../../../module/album/CreateAlbumModal";
import useUser from "../../../hook/useUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { FaRegUser } from "react-icons/fa6";

const AlbumPage = () => {
	const { albums } = useAlbums();
	const { userData } = useUser();
	const friends = userData?.friends || [];

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
									label: "新規アルバム",
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

					<div className="grid grid-cols-4 gap-3 px-main-padding">
						{friends.length > 0 &&
							friends
								.slice(0, 4)
								.map((item: string) => (
									<FriendItem key={item} uid={item} />
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

const FriendItem = ({ uid }: { uid: string }) => {
	const [friendData, setFriendData] = useState<IUser | null>(null);

	useEffect(() => {
		async function getFriendData() {
			const docRef = doc(db, "users-v2", uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setFriendData(docSnap.data() as IUser);
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		}

		getFriendData();
	}, [uid]);

	if (!friendData) {
		return (
			<div className="flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-full aspect-square">
				<span>NoneData</span>
			</div>
		);
	}

	return (
		<div>
			<div className="w-full overflow-hidden bg-gray-200 rounded-full aspect-square">
				{friendData.photoURL ? (
					<img
						src={friendData.photoURL}
						alt="user-avatar"
						className="object-cover object-center w-full h-full"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full">
						<FaRegUser size={40} className="text-gray-300" />
					</div>
				)}
			</div>
			<p className="mt-1 text-xs text-center">{friendData.displayName}</p>
		</div>
	);
};

export default AlbumPage;
