import React from "react";
import { Navigate, Outlet } from "react-router";
import useUser from "./hook/useUser";

const ProtectedRoutes = () => {
	const { currentUser } = useUser();

	return currentUser ? (
		<>
			<Outlet />
			<Navigate to="/" />
		</>
	) : (
		<Navigate to="/login" />
	); // Redirect to login if not authenticated
};

export default ProtectedRoutes;
