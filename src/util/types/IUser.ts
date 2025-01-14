import { FieldValue } from "firebase/firestore";
import { IAlbum } from "./IAlbum";

export interface IUser {
	uid: string;
	displayName: string | null;
	email: string | null;
	photoURL: string | null;
	posts: string[];
	friends: string[];
	albums: IAlbum[];
	create_at: number | FieldValue;
}
