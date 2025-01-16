import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoAdd } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { useParams } from "react-router";
import useAlbums from "../../../hook/useAlbums";
import {
	query,
	collection,
	where,
	orderBy,
	onSnapshot,
	FieldValue,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { handleTimestampToString } from "../../../util/func/handleTimestampToString";
import { IImage } from "../../../util/types/IImage";
import { FaXmark } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { Drawer } from "antd";
import ImageEditor from "../../../module/album/imageEditor/ImageEditor";

const AlbumImageListPage = () => {
	// get images from database
	const { albums } = useAlbums();
	const params = useParams();

	const filteredAlbum = albums.find((a) => a.aid === params.aid);

	const [images, setImages] = useState<IImage[]>([]);

	useEffect(() => {
		const fetchImages = async () => {
			if (!filteredAlbum) return;
			const q = query(
				collection(db, "images-v2"),
				where("album", "array-contains", filteredAlbum.aid),
				orderBy("update_at", "asc")
			);
			onSnapshot(q, (querySnapshot) => {
				const images: IImage[] = [];
				querySnapshot.forEach((doc) => {
					images.push(doc.data() as IImage);
				});
				console.log(images);
				const imagesWithJsData: IImage[] = images.map((image) => {
					return {
						...image,
						create_at: handleTimestampToString(
							image.create_at as FieldValue
						),
						update_at: handleTimestampToString(
							image.update_at as FieldValue
						),
					};
				});
				setImages(imagesWithJsData.reverse());
			});
		};

		fetchImages();
	}, [filteredAlbum]);

	// const imagess = [
	// 	{
	// 		src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
	// 		width: 320,
	// 		height: 174,
	// 		isSelected: true,
	// 		caption: "After Rain (Jeshu John - designerspics.com)",
	// 	},
	// 	{
	// 		src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
	// 		width: 320,
	// 		height: 212,
	// 		tags: [
	// 			{ value: "Ocean", title: "Ocean" },
	// 			{ value: "People", title: "People" },
	// 		],
	// 		alt: "Boats (Jeshu John - designerspics.com)",
	// 	},
	// 	{
	// 		src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
	// 		width: 320,
	// 		height: 212,
	// 	},
	// ];

	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [pickedImage, setPickedImage] = React.useState<IImage | null>(null);
	const onPickImage = (image: IImage) => {
		setPickedImage(image);
		setIsOpen(true);
	};

	function closeModal() {
		setIsOpen(false);
		setPickedImage(null);
	}

	// edit modal
	const [editModalOpen, setEditModalOpen] = React.useState(false);

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
									icon: <IoMdShare size={18} />,
								},
							]}
						/>
					</>
				}
			/>

			{modalIsOpen && (
				<>
					<Drawer
						placement={"bottom"}
						closable={false}
						width={500}
						// onClose={onClose}
						height={"100%"}
						open={editModalOpen}
						styles={{ body: { padding: 0 } }}
					>
						{pickedImage && <ImageEditor image={pickedImage} setEditModalOpen={setEditModalOpen} />}
					</Drawer>
					<div className="absolute inset-0 bg-white z-[1000]">
						<div className="relative flex items-center justify-center w-full h-svh">
							{/* modal header  */}
							<div className="absolute top-0 left-0 z-50 flex items-center justify-between w-full h-header-height px-main-padding">
								<span onClick={closeModal}>
									<FaXmark
										className="text-ios-blue"
										size={20}
									/>
								</span>
								<div className="flex items-center gap-5">
									<span
										onClick={() => setEditModalOpen(true)}
									>
										<LiaEdit
											size={28}
											className="text-ios-blue"
										/>
									</span>
									<span>
										<OptionPopover
											iconClassName="text-ios-blue"
											contents={[
												{
													label: "シェア",
													onClick: () => null,
													icon: (
														<IoMdShare size={18} />
													),
												},
											]}
										/>
									</span>
								</div>
							</div>
							{pickedImage && (
								<img
									src={pickedImage.uri}
									alt="image"
									className="object-contain w-full"
								/>
							)}
						</div>
					</div>
				</>
			)}

			<div className="overflow-y-scroll pt-header-height h-svh">
				<div className="grid grid-cols-3 gap-0.5 mx-0.5">
					{images.length > 0 &&
						images.map((image) => (
							<div
								key={image.iid}
								className="w-full aspect-square"
								onClick={() => onPickImage(image)}
							>
								<img
									src={image.uri}
									alt="image"
									className="object-cover object-center"
								/>
							</div>
						))}
				</div>
			</div>
		</MainLayout>
	);
};

export default AlbumImageListPage;
