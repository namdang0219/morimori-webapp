import React, { Dispatch, SetStateAction, useState } from "react";
import { IImage } from "../../../util/types/IImage";
import { FaXmark } from "react-icons/fa6";
import "./ImageEditor.scss";
import { IoSaveOutline, IoSunny } from "react-icons/io5";
import {
	RiContrastDropFill,
	RiEmojiStickerLine,
	RiResetLeftFill,
	RiTempHotLine,
} from "react-icons/ri";
import { IoMdContrast } from "react-icons/io";
import { Drawer, Slider } from "antd";
import { toast } from "react-toastify";

const ImageEditor = ({
	image,
	setEditModalOpen,
}: {
	image: IImage;
	setEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	// handle color filter
	const [brightness, setBrightness] = useState(100);
	const [saturation, setSaturation] = useState(100);
	const [contrast, setContrast] = useState(100);
	const [hue, setHue] = useState(0);

	const [activeFilter, setActiveFilter] = useState<
		"brightness" | "saturation" | "contrast" | "hue" | null
	>(null);

	const handleBrightnessChange = (value: number) => setBrightness(value);
	const handleSaturationChange = (value: number) => setSaturation(value);
	const handleContrastChange = (value: number) => setContrast(value);
	const handleHueChange = (value: number) => setHue(value);

	const resetAllValues = () => {
		setBrightness(100);
		setSaturation(100);
		setContrast(100);
		setHue(0);
		toast.success("リセットしました！");
	};

	// handle sticker modal
	const [stikerModalOpen, setStickerModalOpen] = useState<boolean>(false);

	return (
		<div className="relative flex items-center justify-center w-full bg-black h-svh">
			{/* header  */}
			<div className="absolute top-0 left-0 flex items-center justify-between w-full px-main-padding h-header-height">
				<span onClick={() => setEditModalOpen(false)}>
					<FaXmark size={20} color="white" />
				</span>

				<div className="flex items-center gap-4 text-white">
					<span onClick={resetAllValues}>
						<RiResetLeftFill size={22} />
					</span>
					<span onClick={() => setStickerModalOpen(true)}>
						<RiEmojiStickerLine size={24} />
					</span>
					<span>
						<IoSaveOutline size={22} />
					</span>
				</div>
			</div>

			<Drawer
				placement={"bottom"}
				closable={false}
				width={500}
				onClose={() => setStickerModalOpen(false)}
				height={"60%"}
				open={stikerModalOpen}
				styles={{ body: { padding: 0 } }}
			>
				<div className="flex flex-col h-full px-main-padding pt-main-padding">
					<h3 className="mb-2 text-lg font-medium">ステッカー選択</h3>
					<div className="grid flex-1 grid-cols-4 gap-4 overflow-y-scroll">
						{Array(20)
							.fill(0)
							.map((item, index) => (
								<div key={index} className="w-full aspect-square">
									<img
										src="https://i.pinimg.com/736x/c0/27/49/c027490c674ecee85e240035e960cbc0.jpg"
										alt="sticker"
                                        className="object-contain object-center w-full h-full"
									/>
								</div>
							))}
					</div>
				</div>
			</Drawer>

			<img
				src={image.uri}
				alt="selected-image"
				className="object-contain w-full"
				style={{
					filter: `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) hue-rotate(${hue}deg)`,
				}}
			/>

			<div
				className={`absolute bottom-0 left-0 flex items-center w-full text-xs text-gray-300 justify-evenly h-header-height`}
			>
				<button
					onClick={() =>
						setActiveFilter(
							activeFilter === "brightness" ? null : "brightness"
						)
					}
				>
					<IoSunny size={20} />
					<span className="button-name">明るさ</span>
				</button>
				<button
					onClick={() =>
						setActiveFilter(
							activeFilter === "saturation" ? null : "saturation"
						)
					}
				>
					<RiContrastDropFill size={20} />
					<span className="button-name">彩度</span>
				</button>

				<button
					onClick={() =>
						setActiveFilter(
							activeFilter === "contrast" ? null : "contrast"
						)
					}
				>
					<IoMdContrast size={20} />
					<span className="button-name">コントラスト</span>
				</button>
				<button
					onClick={() =>
						setActiveFilter(activeFilter === "hue" ? null : "hue")
					}
				>
					<RiTempHotLine size={20} />
					<span className="button-name">色相</span>
				</button>

				{activeFilter === "brightness" && (
					<div className="slider">
						<label>明るさ: {brightness}%</label>
						<Slider
							defaultValue={30}
							// tooltip={{ open: true }}
							min={0}
							max={200}
							value={brightness}
							onChange={(e) => handleBrightnessChange(e)}
							style={{ width: 300 }}
							styles={{
								rail: {
									backgroundColor: "gray",
								},
							}}
						/>
					</div>
				)}

				{activeFilter === "saturation" && (
					<div className="slider">
						<label>彩度: {saturation}%</label>
						<Slider
							defaultValue={30}
							// tooltip={{ open: true }}
							min={0}
							max={200}
							value={saturation}
							onChange={(e) => handleSaturationChange(e)}
							style={{ width: 300 }}
							styles={{
								rail: {
									backgroundColor: "gray",
								},
							}}
						/>
					</div>
				)}

				{activeFilter === "contrast" && (
					<div className="slider">
						<label>コントラスト: {contrast}%</label>
						<Slider
							defaultValue={30}
							// tooltip={{ open: true }}
							min={0}
							max={200}
							value={contrast}
							onChange={(e) => handleContrastChange(e)}
							style={{ width: 300 }}
							styles={{
								rail: {
									backgroundColor: "gray",
								},
							}}
						/>
					</div>
				)}

				{activeFilter === "hue" && (
					<div className="slider">
						<label>色相: {hue}%</label>
						<Slider
							defaultValue={30}
							// tooltip={{ open: true }}
							min={0}
							max={200}
							value={hue}
							onChange={(e) => handleHueChange(e)}
							style={{ width: 300 }}
							styles={{
								rail: {
									backgroundColor: "gray",
								},
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageEditor;
