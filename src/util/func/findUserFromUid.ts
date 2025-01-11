import { userMocks } from "../../mock/userMocks";
import { IUser } from "../types/IUser";

export const findUserFromUid = (userId: IUser["uid"]) => {
	const user: IUser | undefined = userMocks.find((u) => u.uid === userId);
	return user;
};
