import { FieldValue } from "firebase/firestore";
import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IAlbum {
	aid: string;
	author: IUser["uid"];
	title: string;
	desc: string;
	cover: string;
	favorite: boolean;
	taggedFriends: IUser["uid"][];
	images: IImage["iid"][];
	create_at: string | number | FieldValue;
	update_at: string | number | FieldValue;
}
