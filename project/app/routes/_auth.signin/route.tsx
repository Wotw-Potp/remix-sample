import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	type MetaFunction,
	json,
	redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import PageHeading from "~/components/elements/heading/PageHeading";
import { routes } from "~/libs/routes";
import { login } from "~/services/authService.server";
import {
	createUserCredencialSession,
	getSession,
} from "~/services/sessionStorageService.server";
import SigninForm from "./components/SigninForm";
import { usePopupToastDispatch } from "~/contexts/popupToastContext";
import { useEffect } from "react";

/* meta */
export const meta: MetaFunction = () => {
	return [
		{ title: "Sign In" },
		{ name: "description", content: "Sign in to your account" },
	];
};
/* action */
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const { errors, message, userId } = await login(formData);

	if (errors || message || !userId) {
		return json({ errors, message });
	}

	return await createUserCredencialSession(userId, routes.admin.DASHBOARD);
}
/* loader */
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	if (session.has("userId")) {
		return redirect(routes.admin.DASHBOARD);
	}

	const flashMessage: string | null = session.get("flashMessage") || null;
	return json({ flashMessage });
}
/* ui */
export default function SignIn() {
	const { errors, message } = useActionData<typeof action>() || {};
	const { flashMessage } = useLoaderData<typeof loader>();
	const { toggleIsShowToast, setMessage, setType } = usePopupToastDispatch();

	useEffect(() => {
		if (!flashMessage) return;
		setMessage(flashMessage);
		setType("success");
		toggleIsShowToast(true);
	}, [flashMessage, toggleIsShowToast, setMessage, setType]);

	return (
		<div>
			<PageHeading>Sign in</PageHeading>
			<div className="mt-5">
				<SigninForm errors={errors} message={message} />
			</div>
		</div>
	);
}
