import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IUser } from "../util/types/IUser";
import { currentUser } from "../mock/currentUserMock";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface UserContextType {
	currentUser: IUser | null;
}

const UserContext = createContext<UserContextType>({
	currentUser,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				// const uid = user.uid;
				setUser({
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
					friends: [],
					posts: [],
				});
				// ...
			} else {
				// User is signed out
				// ...
				setUser(null);
			}
		});
	}, [user]);

	const values = {
		currentUser: user,
	};

	return (
		<UserContext.Provider value={values}>{children}</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
