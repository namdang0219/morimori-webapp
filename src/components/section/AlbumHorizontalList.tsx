import React from "react";
import SectionTitle from "../title/SectionTitle";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { IoHeart } from "react-icons/io5";
import { IAlbum } from "../../util/types/IAlbum";
import { FaPlus } from "react-icons/fa6";

const AlbumHorizontalList = ({
	title,
	contents,
	seeMoreHref,
}: {
	title: string;
	contents: IAlbum[];
	seeMoreHref: string;
}) => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="flex items-center justify-between mb-2 px-main-padding">
				<SectionTitle>{title}</SectionTitle>
				<button
					className="flex flex-row items-center gap-1 text-sm text-gray-400"
					onClick={() => navigate(seeMoreHref)}
				>
					<span className="ml-auto">すべて</span>
					<span>
						<FaChevronRight size={14} />
					</span>
				</button>
			</div>

			<div className="flex w-screen gap-2 overflow-x-scroll pl-main-padding scroll-hidden">
				{contents.length === 0 && (
					<div className="w-[140px] text-gray-400 bg-gray-100 flex items-center justify-center h-[160px] relative rounded-lg overflow-hidden shrink-0 bg-cover bg-center">
						<span>
							<FaPlus size={30}  />
						</span>
					</div>
				)}

				{contents.length > 0 &&
					contents.slice(0, 5).map((item: IAlbum) => (
						<div
							key={item.aid}
							className="w-[140px] h-[160px] relative rounded-lg overflow-hidden shrink-0 bg-cover bg-center"
							onClick={() =>
								navigate(`/album/detail/${item.aid}`)
							}
							style={{
								backgroundImage: `url(${item.cover})`,
							}}
						>
							{item.favorite && (
								<div className="absolute flex items-center justify-center bg-white rounded-full bottom-2 right-2 w-7 aspect-square">
									<IoHeart
										color="red"
										size={20}
										className="mt-0.5"
									/>
								</div>
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export default AlbumHorizontalList;
