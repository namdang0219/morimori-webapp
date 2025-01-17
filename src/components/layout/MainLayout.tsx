import React, { ReactNode } from "react";
import Navigation from "../../module/Navigation";
import { useAppState } from "../../hook/userAppState";

const MainLayout = ({
	children,
	navHidden = false,
}: {
	children: ReactNode;
	navHidden?: boolean;
}) => {
	const { appLoading } = useAppState();

	return (
		<div className="relative w-screen h-svh">
			<div>{children}</div>

			{/* loading overlay  */}
			{appLoading && (
				<div className="absolute inset-0 bg-black bg-opacity-20 z-[100000] flex items-center justify-center">
					<div className="flex items-center justify-center w-[88px] aspect-square rounded-3xl bg-white">
						<div className="scale-50">
							<div className="app-loader" />
						</div>
					</div>
				</div>
			)}

			{!navHidden && <Navigation />}
		</div>
	);
};

export default MainLayout;
