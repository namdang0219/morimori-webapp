import { Route, Routes } from "react-router";
import AlbumPage from "./page/app/album/AlbumPage";
import AlbumDetailPage from "./page/app/album/AlbumDetailPage";
import MapPage from "./page/app/map/MapPage";
import CameraPage from "./page/app/camera/CameraPage";
import NotificationPage from "./page/app/notification/NotificationPage";
import ProfilePage from "./page/app/profile/ProfilePage";
import PageNotFound from "./page/app/global/PageNotFound";
import LoginPage from "./page/auth/LoginPage";
import SignupPage from "./page/auth/SignupPage";
import React from "react";
import AlbumImageListPage from "./page/app/album/AlbumImageListPage";
import ProfileEditPage from "./page/app/profile/ProfileEditPage";
import SettingPage from "./page/app/profile/SettingPage";
import useUser from "./hook/useUser";

const App = () => {
	const { currentUser, loadingUser } = useUser();

	if (loadingUser) {
		return (
			<div className="absolute inset-0 flex-col flex items-center justify-center bg-white z-[100000]">
				<div className="app-loader"></div>
				<div className="mt-10 text-lg font-medium">
					<span className="text-primary">モリモリ</span>
					へようこそ！
				</div>
			</div>
		);
	}

	return (
		<Routes>
			{currentUser ? (
				// App
				<>
					{/* <Route element={<ProtectedRoutes />}> */}
					{/* album  */}
					<Route path="/" element={<AlbumPage />} />
					<Route
						path="/album/detail/:aid"
						element={<AlbumDetailPage />}
					/>
					<Route
						path="/album/photos/:aid/"
						element={<AlbumImageListPage />}
					/>
					{/* map  */}
					<Route path="/map" element={<MapPage />} />
					{/* camera  */}
					<Route path="/camera" element={<CameraPage />} />
					{/* notification  */}
					<Route
						path="/notification"
						element={<NotificationPage />}
					/>
					{/* profile  */}
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/profile-edit" element={<ProfileEditPage />} />
					<Route path="/setting" element={<SettingPage />} />
					{/* </Route> */}
				</>
			) : (
				// Auth
				<>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</>
			)}
			{/* Global  */}
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default App;
