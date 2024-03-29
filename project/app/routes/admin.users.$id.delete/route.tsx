import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { routes } from "~/libs/routes";
import {
	getSession,
	getUserIdFromSession,
	commitSession,
	destroyUserSession,
} from "~/services/sessionStorageService.server";
import { deleteUser } from "~/services/userService.server";

export async function action({ request, params }: ActionFunctionArgs) {
	const { id } = params;
	const currentUserId = await getUserIdFromSession(request);

	if (!id || !currentUserId || Number.parseInt(id) !== currentUserId) {
		throw new Error("Invalid request");
	}

	// delete user
	const deletedUser = await deleteUser(currentUserId);
	console.log("deletedUser", deletedUser);

	// destroy user session
	await destroyUserSession(request);

	const session = await getSession();
	session.flash("flashMessage", "User deleted successfully");

	return redirect(routes.SIGNIN, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
