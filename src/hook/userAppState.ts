import { useContext } from "react";
import { AppStateContext } from "../context/app-state-context";

const useAppState = () => {
	const context = useContext(AppStateContext);

	if (typeof context === "undefined") {
		throw new Error("appContext is undefined");
	}

	return context;
};

export { useAppState };
