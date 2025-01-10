import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { useNavigate, useParams } from "react-router";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoMdShare } from "react-icons/io";
import { albumMocks } from "../../../mock/albumMocks";
import { IAlbum } from "../../../util/types/IAlbum";

const AlbumDetailPage = () => {
	const navigate = useNavigate();
	const params = useParams();

	const albumId = params.aid;
	const albumDetail: IAlbum = albumMocks.find(
		(a) => a.aid === albumId
	) as IAlbum;

	const createAt = `${new Date(albumDetail.create_at).getFullYear()}/${
		new Date(albumDetail.create_at).getMonth() + 1
	}/${new Date(albumDetail.create_at).getDate()}`;

	return (
		<MainLayout navHidden={true}>
			<div className="flex flex-col h-svh">
				<div className="flex-1 overflow-hidden bg-orange-200 rounded-b-3xl">
					<Header
						backTitle="アルバム"
						containerClassName="bg-transparent backdrop-blur-0 text-white"
						rightContainer={
							<>
								<OptionPopover
									contents={[
										{
											label: "Share Album",
											onClick: () => null,
											icon: <IoMdShare size={18} />,
										},
									]}
								/>
							</>
						}
					/>

					<img
						src={albumDetail.cover}
						alt="album-cover"
						className="object-cover object-center w-full h-full"
					/>
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

					<button
						className="w-full h-12 rounded-full bg-violet-500"
						onClick={() => navigate("/album/photos/1")}
					>
						<span className="font-medium text-white">
							写真を見る
						</span>
					</button>
				</div>
			</div>
		</MainLayout>
	);
};

export default AlbumDetailPage;
