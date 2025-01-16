import { FieldValue } from "firebase/firestore";
import { IAlbum } from "./IAlbum";
import { IUser } from "./IUser";

export interface IImage {
	iid: string;
	uri: string;
	author: IUser["uid"]; // uid
	album: IAlbum["aid"][];
	location: {
		lat: number;
		long: number;
	};
	create_at: string | FieldValue;
	update_at: string | FieldValue;
}
