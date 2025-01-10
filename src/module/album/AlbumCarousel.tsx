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
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
				<div className="flex items-center justify-center h-[250px] w-screen">
					<img
						src="https://i.pinimg.com/736x/24/b3/03/24b303141d27412330944b21dbcdf625.jpg"
						alt=""
					/>
				</div>
			</Slider>
		</div>
	);
};

export default AlbumCarousel;
