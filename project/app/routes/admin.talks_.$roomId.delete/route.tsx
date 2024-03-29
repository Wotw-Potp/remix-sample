import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { routes } from "~/libs/routes";
import {
	getSession,
	commitSession,
} from "~/services/sessionStorageService.server";
import { deleteRoom } from "~/services/talkService.server";

export async function action({ params, request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const { roomId } = params;
	if (!roomId) {
		throw new Error("Invalid room id");
	}
	// delete room
	const { message } = await deleteRoom(roomId);
	session.flash("flashMessage", message);
	// redirect to admin talks page
	return redirect(routes.admin.TALKS, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
