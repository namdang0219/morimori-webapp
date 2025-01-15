import React from "react";
import Slider from "react-slick";
import useAlbums from "../../hook/useAlbums";

const AlbumCarousel = () => {
	const { albums } = useAlbums();

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
	return (
		<div className="w-screen overflow-hidden slider-container shrink-0">
			{/* album.length == 1  */}
			{albums.length === 1 && (
				<div className="flex items-center justify-center relative h-[240px] w-screen">
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
