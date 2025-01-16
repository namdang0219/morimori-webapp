import React, { Dispatch, SetStateAction, useRef, useState } from "react";
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
import DraggableSticker from "../../../components/sticker/DraggableSticker";
import { useOnClickOutside } from "usehooks-ts";

export type ISticker = {
	sid: string;
	url: string;
	x: number;
	y: number;
	scale: number;
	rotate: number;
};

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

	const sliderRef = useRef(null);

	const handleClickOutsideSlider = () => {
        setActiveFilter(null);
    };

	useOnClickOutside(sliderRef, handleClickOutsideSlider);

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
	const [stickers, setStickers] = useState<ISticker[]>([]);
	const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
	const imageRef = useRef(null);

	console.log("🚀 ~ stickers:", stickers);
	console.log("🚀 ~ selectedSticker:", selectedSticker);

	// Thêm sticker mới

	const addSticker = (stickerUrl: string) => {
		const newSticker: ISticker = {
			sid: String(Math.floor(Math.random() * (100 - 1 + 1))),
			url: stickerUrl,
			x: 0,
			y: 100,
			scale: 1,
			rotate: 90,
		};
		setStickers([...stickers, newSticker]);
	};

	// Xóa sticker
	const removeSticker = (sid: string) => {
		setStickers(stickers.filter((sticker) => sticker.sid !== sid));
	};

	// Cập nhật sticker
	const updateSticker = (sid: string, updates: any) => {
		setStickers(
			stickers.map((sticker) =>
				sticker.sid === sid ? { ...sticker, ...updates } : sticker
			)
		);
	};

	// Tải ảnh lên Firebase
	const uploadToFirebase = async () => {
		try {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const img = imageRef.current;

			if (!img || !ctx) return;

			// Kích thước canvas
			canvas.width = img.naturalHeight;
			canvas.height = img.naturalHeight;

			// Áp dụng bộ lọc ảnh
			ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) hue-rotate(${hue}deg)`;
			ctx.drawImage(img, 0, 0);

			// Vẽ sticker lên canvas
			stickers.forEach((sticker) => {
				const imgSticker = new Image();
				imgSticker.src = sticker.url;
				ctx.save();
				ctx.translate(
					sticker.x + imgSticker.width / 2,
					sticker.y + imgSticker.height / 2
				);
				ctx.rotate((sticker.rotate * Math.PI) / 180);
				ctx.scale(sticker.scale, sticker.scale);
				ctx.translate(-imgSticker.width / 2, -imgSticker.height / 2);
				ctx.drawImage(imgSticker, 0, 0);
				ctx.restore();
			});

			// Chuyển canvas thành dữ liệu base64
			const dataUrl = canvas.toDataURL();

			if (!dataUrl) return;

			// Upload lên Firebase
			// const storage = getStorage();
			// const storageRef = ref(storage, `edited-image-${Date.now()}.png`);
			// await uploadString(storageRef, dataUrl, "data_url");
			alert("Image uploaded to Firebase successfully!");
		} catch (error) {
			console.log(error);
			toast.error("失敗しました！");
		}
	};

	return (
		<div className="relative flex items-center justify-center w-full overflow-hidden bg-black h-svh">
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

			{/* sticker modal  */}
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
								<div
									className="w-full aspect-square"
									key={index}
									onClick={() => {
										addSticker(
											"https://i.pinimg.com/736x/bb/af/14/bbaf14319836e84fd2520c91bc7c3d7f.jpg"
										);
										setStickerModalOpen(false);
									}}
								>
									<img
										src="https://i.pinimg.com/736x/bb/af/14/bbaf14319836e84fd2520c91bc7c3d7f.jpg"
										alt="img"
										className="object-contain object-center w-full h-full"
									/>
								</div>
							))}
					</div>
				</div>
			</Drawer>

			<div className="">
				<img
					src={image.uri}
					alt="selected-image"
					className="object-contain w-full"
					style={{
						filter: `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) hue-rotate(${hue}deg)`,
					}}
				/>

				{stickers.length > 0 &&
					stickers.map((sticker) => (
						<div key={sticker.sid}>
							<DraggableSticker sticker={sticker} />
						</div>
					))}
			</div>

			{/* bottom container  */}
			<div
				className={`absolute border-t border-t-gray-700 bottom-0 left-0 flex items-center w-full text-xs text-gray-300 justify-evenly h-[56px]`}
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
					<div className="slider" ref={sliderRef}>
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
					<div className="slider" ref={sliderRef}>
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
					<div className="slider" ref={sliderRef}>
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
					<div className="slider" ref={sliderRef}>
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
