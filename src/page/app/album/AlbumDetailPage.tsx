import React from "react";
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
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { toast } from "react-toastify";

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

	const handleShareAlbum = async () => {
		if (navigator.share) {
			const shareData = {
				title: "アルバムをシェアしよう！",
				text: "これをシェアしますか？",
				url: `https://morimori-webapp.vercel.app${location.pathname}`,
			};

			navigator
				.share(shareData)
				.then(() => console.log("完成！"))
				.catch((error) => console.error("エラーが発生しました", error));
		} else {
			console.log("シェア機能がサポートされていないブラウザー");
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
									const taggedUser = findUserFromUid(item);
									return (
										<div
											key={item}
											className={`overflow-hidden bg-white border-2 border-white rounded-full w-11 aspect-square`}
											style={{
												marginLeft:
													index == 0 ? 0 : -20,
											}}
										>
											<img
												src={
													taggedUser?.photoURL as string
												}
												alt="user-avatar"
												className="object-cover object-center w-full h-full"
											/>
										</div>
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
							onClick={handleShareAlbum}
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

					<ButtonPrimary onClick={() => navigate(`/album/photos/${albumDetail.aid}`)}>
						写真を見る
					</ButtonPrimary>
				</div>
			</div>
		</MainLayout>
		// <div></div>
	);
};

export default AlbumDetailPage;
