import { useRouteLoaderData } from "@remix-run/react";
import SidebarNavigationLinks from "./NavigationLinks";
import SidebarProfile from "./Profile";
import type { IUserResponse } from "~/interfaces/user.interface";

export default function Sidebar() {
	const { user } = useRouteLoaderData("routes/admin") as IUserResponse;

	return (
		<aside>
			<div className="py-10 px-4">
				{user && <SidebarProfile name={user.name} role={user.role} />}
			</div>
			<div>
				<SidebarNavigationLinks />
			</div>
		</aside>
	);
}
