import React, { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoAdd } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { useLocation, useParams } from "react-router";
import useAlbums from "../../../hook/useAlbums";
import { handleTimestampToString } from "../../../util/func/handleTimestampToString";
import { IImage } from "../../../util/types/IImage";
import { FaXmark } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { Drawer } from "antd";
import ImageEditor from "../../../module/album/imageEditor/ImageEditor";
import { RiShareForwardFill } from "react-icons/ri";
import { handleShareAlbum } from "../../../util/func/handleShareAlbum";
import { useAppState } from "../../../hook/userAppState";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	FieldValue,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import useUser from "../../../hook/useUser";

const AlbumImageListPage = () => {
	// get images from database
	const { albums } = useAlbums();
	const params = useParams();
	const location = useLocation();
	const [loading, setLoading] = useState<boolean>(false);
	const { setAppStateLoading } = useAppState();
	const { currentUser } = useUser();

	const filteredAlbum = albums.find((a) => a.aid === params.aid);

	const [images, setImages] = useState<IImage[]>([]);

	// handle add image to album
	const inputFileRef = React.useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<any>();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files?.length === 0) {
			if (inputFileRef.current) {
				inputFileRef.current.click();
			}
		}
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file); // create file url
			console.log("🚀 ~ handleChange ~ url:", url);
			setImage(url); // save file to state
			setImageFile(file);
		}
	}

	useEffect(() => {
		const handleCreateAlbum = async () => {
			setAppStateLoading(true);
			const photosRef = ref(storage, `photos/${Date.now()}.jpg`);

			await uploadBytes(photosRef, imageFile);
			const downloadUrl = await getDownloadURL(photosRef);

			const newImage: IImage = {
				album: [String(filteredAlbum?.aid)],
				author: String(currentUser?.uid),
				create_at: serverTimestamp(),
				iid: String(serverTimestamp()),
				location: {
					lat: 37.7749,
					long: -122.4194,
				},
				update_at: serverTimestamp(),
				uri: downloadUrl,
			};

			const docRef = await addDoc(collection(db, "images-v2"), newImage);
			await updateDoc(docRef, {
				iid: docRef.id,
			});

			await updateDoc(doc(db, "albums-v2", String(filteredAlbum?.aid)), {
				images: arrayUnion(docRef.id),
			});

			// clear modal and loading state
			setAppStateLoading(false);
			console.log("successfully");
		};

		if (imageFile) {
			handleCreateAlbum();
			setImageFile(null);
		}
		console.log(imageFile);
		// eslint-disable-next-line
	}, [imageFile]);

	useEffect(() => {
		const fetchImages = async () => {
			setLoading(true);
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
			setLoading(false);
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
						<label htmlFor="choose-image">
							<IoAdd size={28} />
							<input
								type="file"
								id="choose-image"
								ref={inputFileRef}
								onChange={(e) => handleChange(e)}
								accept="image/*"
								className="hidden"
							/>
						</label>
						<OptionPopover
							contents={[
								{
									label: "アルバムをシェア",
									onClick: () =>
										handleShareAlbum(location.pathname),
									icon: <RiShareForwardFill size={18} />,
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
						{pickedImage && (
							<ImageEditor
								image={pickedImage}
								setEditModalOpen={setEditModalOpen}
							/>
						)}
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
								className="w-full overflow-hidden aspect-square"
								onClick={() => onPickImage(image)}
							>
								<img
									src={image.uri}
									alt="image"
									className="object-cover object-center w-full h-full"
								/>
							</div>
						))}

					{/* {loading && (
						<div className="w-full skeleton aspect-square"></div>
					)} */}
				</div>
			</div>
		</MainLayout>
	);
};

export default AlbumImageListPage;
