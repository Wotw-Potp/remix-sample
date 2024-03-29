import { Outlet, useMatches } from "@remix-run/react";
import {
	type LoaderFunctionArgs,
	redirect,
	json,
	type LinksFunction,
} from "@remix-run/node";
import { getUserIdFromSession } from "~/services/sessionStorageService.server";
import { getUserById } from "~/services/userService.server";
import Sidebar from "./components/Sidebar";
import { routes } from "~/libs/routes";
import AdminStyle from "./admin.css";
import OverlayModalProvider, {
	useOverlayModal,
	useOverlayModalDispatch,
} from "~/contexts/overlayModalContext";
import Navbar from "./components/Navbar";
import PopupToastProvider, {
	usePopupToast,
	usePopupToastDispatch,
} from "~/contexts/popupToastContext";
import type { TAdminOutletContexts } from "~/interfaces/context.interface";
import type { IMatch } from "~/interfaces/common.interface";
import Breadcrumb from "./components/Breadcrumb";

/* links */
export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: AdminStyle },
];
/* meta */
export const metaBase = [{ name: "robots", content: "noindex, nofollow" }];
/* loader */
export async function loader({ request }: LoaderFunctionArgs) {
	// Redirect to login if not authenticated
	const userId = await getUserIdFromSession(request);
	if (!userId) return redirect(routes.SIGNIN);

	// Get user data
	const { user } = await getUserById(userId);

	if (!user) {
		throw new Error("User not found");
	}

	return json({ user });
}
/* ui */
export default function AdminLayout() {
	const modalContext = useOverlayModal();
	const modalDispatchContext = useOverlayModalDispatch();
	const popupToastContext = usePopupToast();
	const popupToastDispatchContext = usePopupToastDispatch();
	const matches = useMatches() as IMatch[];

	return (
		<OverlayModalProvider>
			<PopupToastProvider>
				<div className="w-screen h-screen overflow-hidden flex bg-blue-600">
					<div className="basis-[28ch] shrink-0">
						<Sidebar />
					</div>
					<div className="grow bg-slate-100 overflow-y-scroll">
						<Navbar />
						<main className="py-8 px-10">
							<div className="pb-3">
								<Breadcrumb
									breadcrumbs={matches
										.filter((match) => match.handle?.breadcrumbs)
										.flatMap((match) => match.handle?.breadcrumbs || [])}
								/>
							</div>
							<Outlet
								context={
									{
										...modalContext,
										...modalDispatchContext,
										...popupToastContext,
										...popupToastDispatchContext,
									} satisfies TAdminOutletContexts
								}
							/>
						</main>
					</div>
				</div>
			</PopupToastProvider>
		</OverlayModalProvider>
	);
}
