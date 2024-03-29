import { json } from "@remix-run/node";
import { getUsers } from "~/services/userService.server";
import UserListTable from "./components/UsersListTable";
import SectionHeading from "~/components/elements/heading/SectionHeading";

export async function loader() {
	// Get users
	const { users } = await getUsers();

	if (!users) {
		throw new Error("Failed to get users");
	}

	return json({ users });
}

export default function AdminUsersRoute() {
	return (
		<div>
			<SectionHeading>Users</SectionHeading>
			<div className="mt-5">
				<UserListTable />
			</div>
		</div>
	);
}
