import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { IUser } from "../util/types/IUser";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserContextType {
	currentUser: User | null;
	userData: IUser | null;
	setCurrentUser: Dispatch<SetStateAction<User | null>>;
	loadingUser: boolean;
	setLoadingUser: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
	currentUser: null,
	userData: null,
	setCurrentUser: () => {},
	loadingUser: false,
	setLoadingUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<IUser | null>(null);
	const [loadingUser, setLoadingUser] = useState<boolean>(false);

	useEffect(() => {
		setLoadingUser(true);
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
				setLoadingUser(false);
			} else {
				setCurrentUser(null);
				setLoadingUser(false);
			}
		});
	}, [currentUser]);

	useEffect(() => {
		const getUserFriends = async () => {
			const userdocRef = doc(db, "users-v2", String(currentUser?.uid));
			const docSnap = await getDoc(userdocRef);
			if (docSnap.exists()) {
				setUserData(docSnap.data() as IUser);
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		};
		if (currentUser) {
			getUserFriends();
		}
	}, [currentUser]);

	const values = {
		currentUser,
		userData,
		setCurrentUser,
		loadingUser,
		setLoadingUser,
	};

	return (
		<UserContext.Provider value={values}>{children}</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
