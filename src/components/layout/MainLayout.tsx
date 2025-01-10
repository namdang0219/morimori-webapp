import React, { ReactNode } from "react";
import Navigation from "../../module/Navigation";

const MainLayout = ({
	children,
	navHidden = false,
}: {
	children: ReactNode;
	navHidden?: boolean;
}) => {
	return (
		<div className="relative w-screen h-svh">
			<div>{children}</div>

			{!navHidden && <Navigation />}
		</div>
	);
};

export default MainLayout;
