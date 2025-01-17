import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IAlbum } from "../util/types/IAlbum";
import {
	collection,
	FieldValue,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useUser from "../hook/useUser";
import { handleTimestampToString } from "../util/func/handleTimestampToString";

interface AlbumsContextType {
	albums: IAlbum[];
	fetchingAlbums: boolean;
}

const AlbumsContext = createContext<AlbumsContextType>({
	albums: [],
	fetchingAlbums: false,
});

const AlbumsProvider = ({ children }: { children: ReactNode }) => {
	const { userData } = useUser();
	const [remoteAlbums, setRemoteAlbums] = useState<IAlbum[]>([]);
	const [fetchingAlbums, setFetchingAlbums] = useState<boolean>(false);

	useEffect(() => {
		setFetchingAlbums(true);
		const q = query(
			collection(db, "albums-v2"),
			where("author", "==", String(userData?.uid)),
			orderBy("update_at", "asc")
		);
		onSnapshot(q, (querySnapshot) => {
			const albums: IAlbum[] = [];
			querySnapshot.forEach((doc) => {
				albums.push(doc.data() as IAlbum);
			});
			const albumWithJsData: IAlbum[] = albums.map((album) => {
				return {
					...album,
					create_at: handleTimestampToString(
						album.create_at as FieldValue
					) as string,
					update_at: handleTimestampToString(
						album.update_at as FieldValue
					) as string,
				};
			});
			setRemoteAlbums(albumWithJsData.reverse());
		});
		setFetchingAlbums(false);
	}, [userData]);

	const values = {
		albums: remoteAlbums,
		fetchingAlbums,
	};
	return (
		<AlbumsContext.Provider value={values}>
			{children}
		</AlbumsContext.Provider>
	);
};

export { AlbumsProvider, AlbumsContext };
