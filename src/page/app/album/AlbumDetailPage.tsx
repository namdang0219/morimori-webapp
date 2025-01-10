import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { useNavigate } from "react-router";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoMdShare } from "react-icons/io";

const AlbumDetailPage = () => {
	const navigate = useNavigate();

	return (
		<MainLayout navHidden={true}>
			<div className="flex flex-col h-svh">
				<div className="flex-1 overflow-hidden bg-orange-200 rounded-b-3xl">
					<Header
						backTitle="Album Detail"
						containerClassName="bg-transparent backdrop-blur-0 text-white shadow-md"
						rightContainer={
							<>
								<OptionPopover
									contents={[
										{
											label: "Share Album",
											onClick: () => null,
											icon: <IoMdShare size={20} />,
										},
									]}
								/>
							</>
						}
					/>

					<img
						src="https://i.pinimg.com/474x/4a/c4/b2/4ac4b22e1c2cf2d4921592b8a1417cef.jpg"
						alt="album-cover"
						className="object-cover object-center w-full h-full"
					/>
				</div>

				<div className="p-main-padding">
					<div className="mb-4">
						<p className="text-lg text-gray-500">2024/01/09</p>
						<h1 className="text-3xl font-bold">Album Title</h1>
						<p className="text-lg text-gray-500 line-clamp-2">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Quas expedita sunt explicabo, praesentium
							itaque nesciunt placeat sapiente tempora ducimus
							repellendus.
						</p>
					</div>

					<button
						className="w-full rounded-full h-14 bg-violet-500"
						onClick={() => navigate("/album/photos/1")}
					>
						<span className="text-lg text-white">
							Show to Album
						</span>
					</button>
				</div>
			</div>
		</MainLayout>
	);
};

export default AlbumDetailPage;
