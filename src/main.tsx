import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AlbumsProvider } from "./context/albums-context.tsx";
import { UserProvider } from "./context/user-context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<AlbumsProvider>
					<App />
				</AlbumsProvider>
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
);
