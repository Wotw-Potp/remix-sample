import { Link, Outlet } from "@remix-run/react";
import { routes } from "~/libs/routes";
import AuthStyle from "./auth.css";
import type { LinksFunction } from "@remix-run/node";
import PopupToastProvider, {
	usePopupToast,
	usePopupToastDispatch,
} from "~/contexts/popupToastContext";
import type { TAuthOutletContexts } from "~/interfaces/context.interface";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: AuthStyle },
];

export default function AuthLayout() {
	const popupToastContext = usePopupToast();
	const popupToastDispatchContext = usePopupToastDispatch();

	return (
		<PopupToastProvider>
			<div className="w-screen h-screen p-12 overflow-x-hidden grid place-items-center bg-slate-900">
				<header className="fixed z-30 top-0 right-0 left-0">
					<div className="px-10 py-4 flex justify-between items-center">
						<nav>
							<Link to={routes.HOME} className="text-white hover:opacity-80">
								&lt; Back to Home
							</Link>
						</nav>
						<nav className="flex items-center gap-6">
							<Link
								to={routes.SIGNUP}
								className="inline-block text-white text-sm font-bold bg-amber-600 rounded py-3 px-5 hover:bg-amber-700 transition ease-in-out"
							>
								SignUp
							</Link>
							<Link
								to={routes.SIGNIN}
								className="text-white text-sm font-bold underline hover:no-underline"
							>
								SignIn
							</Link>
						</nav>
					</div>
				</header>
				<main className="bg-white rounded-md p-10 w-full max-w-xl">
					<Outlet
						context={
							{
								...popupToastContext,
								...popupToastDispatchContext,
							} satisfies TAuthOutletContexts
						}
					/>
				</main>
			</div>
		</PopupToastProvider>
	);
}
