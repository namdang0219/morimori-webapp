import React, { Fragment, ReactNode } from "react";
import { IoAlbumsOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa";
import { HiOutlineCamera } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router";

interface INavigation {
	name: string;
	href: string;
	icon?: ReactNode;
}

const Navigation = () => {
	const location = useLocation(); 

	const currentPage = location.pathname;

	return (
		<div className="absolute z-[1000] flex items-center gap-1 p-2 -translate-x-1/2 bg-white rounded-full shadow-[0px_2px_20px_rgba(0,0,0,0.10)] bottom-3 left-1/2">
			{navigations.map((n: INavigation) => (
				<Fragment key={n.name}>
					<NavLink
						to={n.href}
						className={`w-[45px] aspect-square rounded-full flex items-center justify-center  ${
							currentPage === n.href
								? "text-violet-500"
								: "text-black"
						} ${n.name === "camera" && "bg-violet-500 text-white"}`}
					>
						{n.icon}
					</NavLink>
				</Fragment>
			))}
		</div>
	);
};

const navigations: INavigation[] = [
	{ name: "album", href: "/", icon: <IoAlbumsOutline size={26} /> },
	{ name: "map", href: "/map", icon: <FaRegMap size={26} /> },
	{
		name: "camera",
		href: "/camera",
		icon: <HiOutlineCamera size={28} color="white" />,
	},
	{
		name: "notification",
		href: "/notification",
		icon: <LuBell size={26} />,
	},
	{ name: "profile", href: "/profile", icon: <FaUser size={22} /> },
];

export default Navigation;
