import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import { IImage } from "../../../util/types/IImage";
import useUser from "../../../hook/useUser";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import { toast } from "react-toastify";
import { db } from "../../../firebaseConfig";

const TestPage = () => {
	const { currentUser } = useUser();

	const addImage = async (image: string) => {
		try {
			const newImage: IImage = {
				iid: Date.now().toString(),
				author: String(currentUser?.uid),
				album: ["CLiXbQiyHh59nArPherK", "pPzP4xQ5PYElWnaDDd45"],
				location: {
					lat: 37.7749,
					long: -122.4194,
				},
				create_at: serverTimestamp(),
				update_at: serverTimestamp(),
				uri: image,
			};

			const imageRef = await addDoc(
				collection(db, "images-v2"),
				newImage
			);
			await updateDoc(imageRef, {
				iid: imageRef.id,
			});

			newImage.album.forEach((a) => {
				updateDoc(doc(db, "albums-v2", a), {
					images: arrayUnion(imageRef.id),
					update_at: serverTimestamp(),
				});
			});

			toast.success("successfully");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MainLayout>
			<div>MapPage</div>
			<ButtonPrimary
				onClick={() =>
					addImage(
						"https://i.pinimg.com/736x/00/9c/df/009cdf107542402dff8f1dedb77aea7c.jpg"
					)
				}
			>
				upload
			</ButtonPrimary>
		</MainLayout>
	);
};

export default TestPage;
