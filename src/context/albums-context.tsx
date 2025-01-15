import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IAlbum } from "../util/types/IAlbum";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import useUser from "../hook/useUser";

interface AlbumsContextType {
	albums: IAlbum[];
}

const AlbumsContext = createContext<AlbumsContextType>({
	albums: [],
});

const AlbumsProvider = ({ children }: { children: ReactNode }) => {
	const { userData } = useUser();
	const [remoteAlbums, setRemoteAlbums] = useState<IAlbum[]>([]);

	useEffect(() => {
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
			setRemoteAlbums(albums.reverse());
		});
	}, [userData]);

	const values = {
		albums: remoteAlbums,
	};
	return (
		<AlbumsContext.Provider value={values}>
			{children}
		</AlbumsContext.Provider>
	);
};

export { AlbumsProvider, AlbumsContext };
