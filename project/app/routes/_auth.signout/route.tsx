import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { routes } from "~/libs/routes";
import { logout } from "~/services/authService.server";

export async function action({ request }: ActionFunctionArgs) {
	const { session } = await logout(request);

	return redirect(routes.SIGNIN, {
		headers: {
			"Set-Cookie": session,
		},
	});
}
