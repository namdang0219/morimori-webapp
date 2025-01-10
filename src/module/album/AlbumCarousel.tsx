import React from "react";
import Slider from "react-slick";

const AlbumCarousel = () => {
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
			<Slider {...settings}>
				{Array(5)
					.fill(0)
					.map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-center h-[240px] w-screen"
						>
							<img
								src="https://i.pinimg.com/736x/d3/e6/ca/d3e6ca47a36569d3bc4400404336c3d5.jpg"
								alt=""
								className="object-cover object-center w-full h-full"
							/>
						</div>
					))}
			</Slider>
		</div>
	);
};

export default AlbumCarousel;
