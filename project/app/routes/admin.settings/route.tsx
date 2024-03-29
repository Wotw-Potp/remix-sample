import {
	json,
	redirect,
	useLoaderData,
	useRouteLoaderData,
} from "@remix-run/react";
import PageHeading from "~/components/elements/heading/PageHeading";
import SectionHeading from "~/components/elements/heading/SectionHeading";
import ProfileEditForm from "./components/ProfileEditForm";
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	SerializeFrom,
} from "@remix-run/node";
import { updateUser } from "~/services/userService.server";
import {
	commitSession,
	getSession,
} from "~/services/sessionStorageService.server";
import { useEffect } from "react";
import { usePopupToastDispatch } from "~/contexts/popupToastContext";
import type { loader as RootLoader } from "~/routes/admin/route";
import { useOverlayModalDispatch } from "~/contexts/overlayModalContext";
import UserDeleteForm from "./components/UserDeleteForm";

/* action */
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const session = await getSession(request.headers.get("Cookie"));
	const { errors, message } = await updateUser(formData);

	if (errors || message) {
		return json({ errors, message }, { status: 400 });
	}

	session.flash("admin.setting.globalMessage", "Profile updated successfully");

	return redirect("/admin/settings", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
/* loader */
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const successMessage: string | null =
		session.get("admin.setting.globalMessage") || null;

	return json(
		{ successMessage },
		{ headers: { "Set-Cookie": await commitSession(session) } },
	);
}
/* ui */
export default function AdminSettingsRoute() {
	const { user } = useRouteLoaderData("routes/admin") as SerializeFrom<
		typeof RootLoader
	>;
	const { successMessage } = useLoaderData<typeof loader>();
	const { toggleIsShowToast, setMessage, setType } = usePopupToastDispatch();
	const { toggleIsModalOpen, setModalContent } = useOverlayModalDispatch();

	useEffect(() => {
		if (!successMessage) return;
		toggleIsShowToast(true);
		setMessage(successMessage);
		setType("success");
	}, [successMessage, setType, setMessage, toggleIsShowToast]);

	return (
		<div>
			<PageHeading>Settings</PageHeading>
			<div className="mt-5 space-y-10">
				<section className="shadow-lg py-10 px-7 rounded-md bg-white">
					<SectionHeading>Profile</SectionHeading>
					<div className="mt-4">
						<ProfileEditForm user={user} />
					</div>
				</section>
				<section className="shadow-lg py-10 px-7 rounded-md bg-white border-2 border-red-600">
					<SectionHeading>Danger Zone</SectionHeading>
					<div className="mt-4 flex items-center justify-between">
						<p>
							Deleting your account will permanently remove all your data from
							our servers.
							<br />
							This action cannot be undone.
						</p>
						<button
							type="button"
							className="font-bold bg-red-600 text-white py-3 px-5 rounded-md hover:bg-red-700"
							onClick={() => {
								setModalContent(
									<>
										<h2 className="text-2xl font-bold text-center">
											Are you sure?
										</h2>
										<div className="mt-5 flex justify-center gap-5">
											<button
												type="button"
												className="font-bold bg-gray-600 text-white py-3 px-5 rounded-md hover:bg-gray-700"
												onClick={() => toggleIsModalOpen(false)}
											>
												cancel
											</button>
											<UserDeleteForm userId={user.id} />
										</div>
									</>,
								);
								toggleIsModalOpen(true);
							}}
						>
							Delete Account
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}
