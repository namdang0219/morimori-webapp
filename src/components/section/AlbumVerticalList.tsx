import React from "react";
import SectionTitle from "../title/SectionTitle";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const AlbumVerticalList = () => {
    const navigate = useNavigate()
	return (
		<div className="mt-3">
			<div className="flex items-center justify-between mb-2 px-main-padding">
				<SectionTitle>Recently</SectionTitle>
				<button className="flex items-center gap-1 text-lg">
					See more
					<span>
						<FaChevronRight size={14} />
					</span>
				</button>
			</div>

			<div className="flex w-screen gap-2 overflow-x-scroll pl-main-padding">
				{new Array(5).fill(null).map((item, index) => (
					<div
						key={index}
						className="w-[180px] h-[200px] rounded-lg overflow-hidden shrink-0"
                        onClick={() => navigate("/album/detail/1")}
					>
						<img
							src="https://i.pinimg.com/736x/87/60/9b/87609b9fa47ac74dc925ce7db5f9ba7f.jpg"
							alt="album-cover"
							className="object-cover object-center w-full h-full"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default AlbumVerticalList;
