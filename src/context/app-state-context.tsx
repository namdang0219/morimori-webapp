import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

type AppStateContextType = {
	appLoading: boolean;
	setAppStateLoading: Dispatch<SetStateAction<boolean>>;
};

const AppStateContext = createContext<AppStateContextType>({
	appLoading: false,
	setAppStateLoading: () => {},
});

const AppStateProvider = ({ children }: { children: ReactNode }) => {
	const [appStateLoading, setAppStateLoading] = useState<boolean>(false);

	const values = {
		appLoading: appStateLoading,
		setAppStateLoading,
	};

	return (
		<AppStateContext.Provider value={values}>
			{children}
		</AppStateContext.Provider>
	);
};

export { AppStateProvider, AppStateContext };
