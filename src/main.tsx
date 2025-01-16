import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AlbumsProvider } from "./context/albums-context.tsx";
import { UserProvider } from "./context/user-context.tsx";
import { AppStateProvider } from "./context/app-state-context.tsx";
import { Slide, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<BrowserRouter>
		<AppStateProvider>
			<UserProvider>
				<AlbumsProvider>
					<ToastContainer
						position="top-center"
						autoClose={3000}
						hideProgressBar={true}
						newestOnTop={true}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
						transition={Slide}
						style={{
							width: "80%",
							left: "50%",
							transform: "translateX(-50%)",
							top: 20,
						}}
					/>
					<App />
				</AlbumsProvider>
			</UserProvider>
		</AppStateProvider>
	</BrowserRouter>
	// </StrictMode>
);
