import React, { createContext, ReactNode } from "react";
import { IAlbum } from "../util/types/IAlbum";
import { albumMocks } from "../mock/albumMocks";

interface AlbumsContextType {
	albums: IAlbum[];
}

const AlbumsContext = createContext<AlbumsContextType>({
	albums: albumMocks,
});

const AlbumsProvider = ({ children }: { children: ReactNode }) => {
	const values = {
		albums: albumMocks,
	};
	return (
		<AlbumsContext.Provider value={values}>
			{children}
		</AlbumsContext.Provider>
	);
};

export { AlbumsProvider, AlbumsContext };
