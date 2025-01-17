import React, { useState } from "react";
import Slider from "react-slick";
import useAlbums from "../../hook/useAlbums";
import { BsPlus } from "react-icons/bs";
import CreateAlbumModal from "./CreateAlbumModal";
import { useNavigate } from "react-router";

const AlbumCarousel = () => {
	const { albums } = useAlbums();
	const navigate = useNavigate();

	const settings = {
		className: "center",
		centerMode: true,
		infinite: true,
		centerPadding: "0px",
		slidesToShow: 1,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	const [createAlbumOpen, setCreateAlbumOpen] = useState<boolean>(false);

	return (
		<div className="w-screen overflow-hidden slider-container shrink-0">
			{/* albums.length == 0  */}
			{albums.length === 0 && (
				<>
					<div
						onClick={() => setCreateAlbumOpen(true)}
						className="flex cursor-pointer items-center bg-gray-100 justify-center relative h-[240px] w-screen"
					>
						<BsPlus size={40} className="text-gray-500" />
					</div>
					<CreateAlbumModal
						open={createAlbumOpen}
						setOpen={setCreateAlbumOpen}
					/>
				</>
			)}

			{/* album.length == 1  */}
			{albums.length === 1 && (
				<div
					onClick={() => navigate(`/album/detail/${albums[0].aid}`)}
					className="flex items-center justify-center relative h-[240px] w-screen"
				>
					<div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-10">
						<div>
							<p className="text-2xl font-medium">
								{albums[0].title}
							</p>
							<p className="font-medium">
								{albums[0].images.length}枚
							</p>
						</div>
					</div>
					<img
						src={albums[0].cover}
						alt="slider-album-cover"
						className="object-cover object-center w-full h-full"
					/>
				</div>
			)}

			<Slider {...settings}>
				{albums.length > 1 &&
					albums.slice(0, 3).map((item, index) => (
						<div
							key={index}
							onClick={() =>
								navigate(`/album/detail/${item.aid}`)
							}
							className="flex items-center justify-center relative h-[240px] w-screen"
						>
							<div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-10">
								<div>
									<p className="text-2xl font-medium">
										{item.title}
									</p>
									<p className="font-medium">
										{item.images.length}枚
									</p>
								</div>
							</div>
							<img
								src={item.cover}
								alt="slider-album-cover"
								className="object-cover object-center w-full h-full"
							/>
						</div>
					))}
			</Slider>
		</div>
	);
};

export default AlbumCarousel;
