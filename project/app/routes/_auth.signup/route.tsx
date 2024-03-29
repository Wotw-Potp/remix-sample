import {
	type ActionFunctionArgs,
	type MetaFunction,
	redirect,
	json,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { registerUser } from "~/services/userService.server";
import { routes } from "~/libs/routes";
import {
	getSession,
	commitSession,
} from "~/services/sessionStorageService.server";
import SignupForm from "./components/SignupForm";
import PageHeading from "~/components/elements/heading/PageHeading";

/* meta */
export const meta: MetaFunction = () => [
	{ title: "Sign Up" },
	{ name: "description", content: "Sign up for an account" },
];
/* action */
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const { errors, message } = await registerUser(formData);

	if (errors || message) {
		return json({ errors, message });
	}

	const session = await getSession(request.headers.get("Cookie"));
	session.flash("flashMessage", "Account created successfully");

	return redirect(routes.SIGNIN, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
/* ui */
export default function SignUp() {
	const { errors, message } = useActionData<typeof action>() || {};

	return (
		<div>
			<PageHeading>Sign Up</PageHeading>
			<div className="mt-5">
				<SignupForm errors={errors} message={message} />
			</div>
		</div>
	);
}
