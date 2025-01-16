import React, { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import useUser from "../../hook/useUser";
import { useAppState } from "../../hook/userAppState";
import { IAlbum } from "../../util/types/IAlbum";
import { Drawer, Modal } from "antd";
import { FaRegEdit } from "react-icons/fa";

const CreateAlbumModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const { currentUser } = useUser();
	const { setAppStateLoading } = useAppState();
	const [title, setTitle] = useState<string>("");
	const [desc, setDesc] = useState<string>("");
	const [albumCover, setAlbumCover] = useState<string | null>(null);
	const [albumCoverFile, setAlbumCoverFile] = useState<any>();

	const inputFileRef = React.useRef<HTMLInputElement>(null);
	const { userData } = useUser();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
		setOpen(false);
	};

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files?.length === 0) {
			if (inputFileRef.current) {
				inputFileRef.current.click();
			}
		}
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file); // Tạo URL tạm thời cho file
			console.log("🚀 ~ handleChange ~ url:", url);
			setAlbumCover(url); // Lưu URL vào state
			setAlbumCoverFile(file);
		}
	}

	const handleCreateAlbum = async () => {
		if (!albumCover) {
			if (inputFileRef.current) {
				inputFileRef.current.click();
			}
		}
		if (!title) {
			alert("タイトルを入力してください");
			return;
		}
		if (!desc) {
			alert("説明を入力してください");
			return;
		}
		setAppStateLoading(true);
		const photosRef = ref(storage, `photos/${Date.now()}.jpg`);

		await uploadBytes(photosRef, albumCoverFile);
		const downloadUrl = await getDownloadURL(photosRef);

		const newAlbum: IAlbum = {
			aid: String(serverTimestamp()),
			author: String(userData?.uid),
			cover: downloadUrl,
			create_at: serverTimestamp(),
			update_at: serverTimestamp(),
			desc: desc,
			favorite: false,
			images: [],
			taggedFriends: [],
			title: title,
		};

		const docRef = await addDoc(collection(db, "albums-v2"), newAlbum);
		await updateDoc(docRef, {
			aid: docRef.id,
		});

		await updateDoc(doc(db, "users-v2", String(currentUser?.uid)), {
			albums: arrayUnion(docRef.id),
		});

		// clear modal and loading state
		setAppStateLoading(false);
		setIsModalOpen(false);
		setOpen(false);
		console.log("successfully");
	};

	return (
		<>
			<Drawer
				placement={"bottom"}
				closable={false}
				open={open}
				key={"createAlbumDrawer"}
				height={"100%"}
				styles={{ body: { padding: 0 } }}
			>
				<div>
					{/* header  */}
					<div className="absolute top-0 left-0 z-40 flex items-center justify-between w-full bg-white h-header-height px-main-padding">
						<span className="w-10" onClick={showModal}>
							<HiOutlineXMark size={24} className="text-danger" />
						</span>
						<span className="text-lg font-medium">
							新規アルバム
						</span>
						<span className="flex w-10" onClick={handleCreateAlbum}>
							<IoMdCheckmark
								size={24}
								className="ml-auto text-green-500"
							/>
						</span>
					</div>

					{/* body  */}
					<div className="pb-20 pt-header-height">
						<div className="w-full relative aspect-[3/4]">
							{albumCover ? (
								<>
									<img
										src={albumCover}
										alt="album-cover"
										className="object-cover object-center w-full h-full"
									/>
									<div className="absolute text-white opacity-80 bottom-5 right-5">
										<label htmlFor="choose-cover">
											<FaRegEdit
												size={30}
												className="shadow-lg"
											/>
											<input
												type="file"
												id="choose-cover"
												ref={inputFileRef}
												onChange={(e) =>
													handleChange(e)
												}
												accept="image/*"
												className="hidden"
											/>
										</label>
									</div>
								</>
							) : (
								<label
									htmlFor="choose-cover"
									className="w-full aspect-[3/4] "
								>
									<div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 bg-gray-200">
										<span>
											<LuImagePlus size={50} />
										</span>
										<div>アルバム画像を選択</div>
										<input
											type="file"
											id="choose-cover"
											ref={inputFileRef}
											onChange={(e) => handleChange(e)}
											accept="image/*"
											className="hidden"
										/>
									</div>
								</label>
							)}
						</div>

						<div className="flex flex-col gap-5 p-main-padding">
							{/* title  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									タイトル
								</p>
								<input
									type="text"
									onChange={(e) => setTitle(e.target.value)}
									placeholder="タイトルを入力"
									className="w-full px-4 py-3 border rounded-lg border-primary"
								/>
							</div>

							{/* desc  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									説明
								</p>
								<input
									type="text"
									onChange={(e) => setDesc(e.target.value)}
									placeholder="説明を入力"
									className="w-full px-4 py-3 border rounded-lg border-primary"
								/>
							</div>

							{/* pick user  */}
							<div>
								<p className="mb-1 font-medium text-primary">
									友達
								</p>
								<div className="grid grid-cols-4 gap-3">
									{Array(5)
										.fill(0)
										.map((item, index) => (
											<div
												key={index}
												className="relative flex-1"
											>
												<img
													src="https://i.pinimg.com/736x/69/b6/c9/69b6c939d19b9befede02bce32fb1b5f.jpg"
													alt="friend-cover-img"
													className="object-cover object-center w-full h-full rounded-full"
												/>
												<div className="absolute top-0 right-0 flex items-center justify-center w-6 bg-white rounded-full shadow-lg aspect-square">
													<FaXmark
														size={18}
														className="text-gray-400"
													/>
												</div>
											</div>
										))}

									<div className="relative flex items-center justify-center flex-1 bg-gray-200 rounded-full">
										<BsPlus
											size={40}
											className="text-gray-400"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Drawer>
			<Modal
				title="内容を破壊しますか？"
				open={isModalOpen}
				onOk={hideModal}
				onCancel={hideModal}
				okText="破壊"
				cancelText="キャンセル"
				destroyOnClose
			></Modal>
		</>
	);
};

export default CreateAlbumModal;
