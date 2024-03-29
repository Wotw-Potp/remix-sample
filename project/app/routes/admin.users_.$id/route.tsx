import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PageHeading from "~/components/elements/heading/PageHeading";
import { routes } from "~/libs/routes";
import { getUserById } from "~/services/userService.server";

/* handle */
export const handle = {
	breadcrumbs: [{ path: routes.admin.USERS, label: "Users" }],
};
/* loader */
export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params;
	if (!id) {
		throw new Error("Invalid user id");
	}
	const { user, status } = await getUserById(Number.parseInt(id));
	if (!user) {
		return redirect(routes.admin.USERS, { status });
	}
	return json({ user }, { status });
}
/* ui */
export default function AdminUsersDetailRoute() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div>
			<PageHeading>User Detail</PageHeading>
			<div>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
		</div>
	);
}
