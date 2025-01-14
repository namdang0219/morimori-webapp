import React, { ReactNode } from "react";
import Navigation from "../../module/Navigation";
import useUser from "../../hook/useUser";

const MainLayout = ({
	children,
	navHidden = false,
}: {
	children: ReactNode;
	navHidden?: boolean;
}) => {
	const { loadingUser } = useUser();

	return (
		<div className="relative w-screen h-svh">
			<div>{children}</div>

			{!navHidden && <Navigation />}
		</div>
	);
};

export default MainLayout;
