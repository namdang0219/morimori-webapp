import { useContext } from "react";
import { UserContext } from "../context/user-context";

const useUser = () => {
	const context = useContext(UserContext);

	if (typeof context === "undefined") {
		throw new Error("useUser must be used within a UserProvider");
	}

	return context;
};

export default useUser;
