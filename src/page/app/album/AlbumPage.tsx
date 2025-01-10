import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { IoAdd } from "react-icons/io5";
import AlbumCarousel from "../../../module/album/AlbumCarousel";
import AlbumSearchModal from "../../../module/album/AlbumSearchModal";
import OptionPopover from "../../../components/popover/OptionPopover";
import AlbumVerticalList from "../../../components/section/AlbumVerticalList";
import Header from "../../../components/layout/Header";

const AlbumPage = () => {
	return (
		<MainLayout>
			{/* header  */}
			<Header
				largeTitle="Album"
				rightContainer={
					<>
						<AlbumSearchModal />
						<OptionPopover
							contents={[
								{
									label: "Add New Album",
									onClick: () => {},
									icon: <IoAdd size={20} />,
								},
							]}
						/>
					</>
				}
			/>

			{/* main  */}
			<div className="flex flex-col gap-4 overflow-y-scroll h-svh pt-header-height">
				{/* carousel  */}
				<AlbumCarousel />
				{/* recently album  */}
				<AlbumVerticalList />
				<AlbumVerticalList />
				<AlbumVerticalList />
			</div>
		</MainLayout>
	);
};

export default AlbumPage;
