import { useContext } from "react";
import { AlbumsContext } from "../context/albums-context";

const useAlbums = () => {
	const context = useContext(AlbumsContext);
	if (typeof context === "undefined") {
		throw new Error("useAlbums must be used within a AlbumsProvider");
	}
	return context;
};

export default useAlbums;
