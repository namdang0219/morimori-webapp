import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoAdd } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";

const AlbumImageListPage = () => {
	return (
		<MainLayout navHidden>
			<Header
				backTitle="Album Detail"
				rightContainer={
					<>
						<IoAdd size={28} />
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
			<div className="overflow-scroll h-svh pt-header-height">
				<div className="grid grid-cols-3 gap-1">
					{Array(20)
						.fill(0)
						.map((item, index) => (
							<div key={index} className="aspect-square">
								<img
									src="https://i.pinimg.com/736x/da/c5/09/dac5097f3cc18d95e4581ab91580282e.jpg"
									alt="image"
								/>
							</div>
						))}
				</div>
			</div>
		</MainLayout>
	);
};

export default AlbumImageListPage;
