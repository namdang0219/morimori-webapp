import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { useLocation, useNavigate, useParams } from "react-router";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { RiEditBoxLine } from "react-icons/ri";
import { IoHeart } from "react-icons/io5";
import { RiShareForwardFill } from "react-icons/ri";
import { findUserFromUid } from "../../../util/func/findUserFromUid";
import { FaPlus } from "react-icons/fa6";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import PageNotFound from "../global/PageNotFound";
import useAlbums from "../../../hook/useAlbums";
import {
	collection,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { toast } from "react-toastify";
import { handleShareAlbum } from "../../../util/func/handleShareAlbum";
import { IUser } from "../../../util/types/IUser";

const AlbumDetailPage = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { albums } = useAlbums();
	const location = useLocation();

	const albumDetail = albums.find((album) => album.aid === params.aid);

	if (!albumDetail) {
		return <PageNotFound />;
	}

	const createdDate = new Date(albumDetail?.update_at as string);

	const handleAlbumFavorite = async () => {
		try {
			const albumDoc = doc(collection(db, "albums-v2"), albumDetail?.aid);
			await updateDoc(albumDoc, {
				favorite: !albumDetail.favorite,
				update_at: serverTimestamp(),
			});
			toast.success("完成！");
		} catch (error) {
			toast.error("エラー！");
			console.log(error);
		}
	};

	const createAt = `${createdDate.getFullYear()}/${
		createdDate.getMonth() + 1
	}/${createdDate.getDate()}`;

	return (
		<MainLayout navHidden={true}>
			<div className="flex flex-col h-svh">
				<Header
					backTitle="アルバム"
					containerClassName="bg-transparent backdrop-blur-0 text-white"
					backTitleClassName="text-white"
					rightContainer={
						<>
							<OptionPopover
								contents={[
									{
										label: "アルバムを編集",
										onClick: () => null,
										icon: <RiEditBoxLine size={18} />,
									},
									{
										label: "アルバムをシェア",
										onClick: () =>
											handleShareAlbum(location.pathname),
										icon: <RiShareForwardFill size={18} />,
									},
								]}
							/>
						</>
					}
				/>

				<div className="relative flex-1 overflow-hidden bg-gray-200 rounded-b-3xl">
					<img
						src={albumDetail.cover}
						alt="album-cover"
						className="object-cover object-center w-full h-full"
					/>
					{/* img container left container  */}
					<div className="absolute flex items-center left-3 bottom-3">
						{albumDetail.taggedFriends.length > 0 &&
							albumDetail.taggedFriends
								.slice(0, 3)
								.map((item, index) => {
									return (
										<TaggedUserItem
											key={item}
											index={index}
											taggedUserId={item}
										/>
									);
								})}
						{albumDetail.taggedFriends.length >= 4 && (
							<div
								className={`overflow-hidden bg-white border-2 relative border-white rounded-full w-11 aspect-square`}
								style={{
									marginLeft: -20,
								}}
							>
								<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
									<FaPlus color="white" size={20} />
								</div>
								<img
									src={
										findUserFromUid(
											albumDetail.taggedFriends[4]
										)?.photoURL as string
									}
									alt="user-avatar"
									className="object-cover object-center w-full h-full"
								/>
							</div>
						)}
					</div>

					{/* img container right container  */}
					<div className="absolute flex items-center gap-2 bottom-3 right-3">
						<button
							onClick={handleAlbumFavorite}
							className="flex items-center justify-center bg-white rounded-full w-11 aspect-square"
						>
							<IoHeart
								size={30}
								className={`mt-0.5 ${
									albumDetail.favorite
										? "text-red-500"
										: "text-gray-400"
								}`}
							/>
						</button>
						<button
							onClick={() => handleShareAlbum(location.pathname)}
							className="flex items-center justify-center bg-white rounded-full w-11 aspect-square"
						>
							<RiShareForwardFill
								size={30}
								className="text-ios-blue"
							/>
						</button>
					</div>
				</div>

				<div className="p-main-padding">
					<div className="mb-4">
						<p className="text-sm text-gray-500">{createAt}</p>
						<h1 className="text-xl font-bold">
							{albumDetail.title}
						</h1>
						<p className="text-gray-500 line-clamp-2">
							{albumDetail.desc}
						</p>
					</div>

					<ButtonPrimary
						onClick={() =>
							navigate(`/album/photos/${albumDetail.aid}`)
						}
					>
						写真を見る
					</ButtonPrimary>
				</div>
			</div>
		</MainLayout>
		// <div></div>
	);
};

const TaggedUserItem = ({
	index,
	taggedUserId,
}: {
	index: number;
	taggedUserId: string;
}) => {
	const [taggedUserData, setTaggedUserData] = useState<IUser | null>(null);

	useEffect(() => {
		async function getFriendData() {
			const docRef = doc(db, "users-v2", taggedUserId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setTaggedUserData(docSnap.data() as IUser);
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		}

		getFriendData();
	}, [taggedUserId]);

	if (!taggedUserData) {
		return (
			<div className="flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-full aspect-square">
				<span>NoneData</span>
			</div>
		);
	}

	return (
		<div
			className={`overflow-hidden bg-white border-2 border-white rounded-full w-11 aspect-square`}
			style={{
				marginLeft: index == 0 ? 0 : -20,
			}}
		>
			{taggedUserData?.photoURL ? (
				<img
					src={taggedUserData?.photoURL as string}
					alt="user-avatar"
					className="object-cover object-center w-full h-full"
				/>
			) : (
				<div className="flex items-center justify-center w-full h-full text-gray-500">
					{taggedUserData.displayName?.slice(0, 1)}
				</div>
			)}
		</div>
	);
};

export default AlbumDetailPage;
