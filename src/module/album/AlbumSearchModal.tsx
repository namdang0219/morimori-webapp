import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Drawer } from "antd";

const AlbumSearchModal = () => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<span onClick={showDrawer}>
				<FiSearch size={28} />
			</span>

			{/* drawer  */}
			<Drawer
				placement={"bottom"}
				closable={false}
				onClose={onClose}
				open={open}
				key={"bottomDrawer"}
				height={"100%"}
			>
				<div>
					<div className="flex items-center gap-3">
						<button
							className="text-lg text-blue-500"
							onClick={onClose}
						>
							Cancel
						</button>
						<input
							type="text"
							placeholder="Search Albums"
							className="w-full px-3 py-2 border-2 border-gray-300 rounded-md"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-5">
						{Array(4)
							.fill(null)
							.map((item, index) => (
								<div
									key={index}
									className="w-full aspect-[3/4] rounded-lg overflow-hidden"
								>
									<img
										src="https://i.pinimg.com/736x/67/dd/0a/67dd0a80baf1bdb16bb38a1fb1d5d16e.jpg"
										alt="album-cover"
										className="object-cover object-center w-full h-full"
									/>
								</div>
							))}
					</div>
				</div>
			</Drawer>
		</>
	);
};

export default AlbumSearchModal;
