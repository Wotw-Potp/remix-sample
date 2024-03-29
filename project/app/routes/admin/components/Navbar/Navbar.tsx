import SignoutForm from "~/components/containers/SignoutForm";
import { useOverlayModalDispatch } from "~/contexts/overlayModalContext";

export default function Navbar() {
	const { toggleIsModalOpen, setModalContent } = useOverlayModalDispatch();

	return (
		<nav className="bg-white">
			<div className="px-10 py-2 flex justify-end">
				<button
					type="button"
					className="inline-block w-10 h-10 p-2 rounded-full text-gray-500 hover:text-white hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					title="Logout"
					onClick={() => {
						setModalContent(
							<>
								<h2 className="text-xl font-bold text-gray-800">
									Are you sure you want to Signout?
								</h2>
								<div className="mt-4 flex justify-end gap-6">
									<div>
										<button
											type="button"
											className="px-6 py-3 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
											onClick={() => toggleIsModalOpen(false)}
										>
											Cancel
										</button>
									</div>
									<div>
										<SignoutForm method="post" action="/signout" />
									</div>
								</div>
							</>,
						);
						toggleIsModalOpen(true);
					}}
				>
					<svg
						fill="none"
						className="w-full"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
						/>
					</svg>
				</button>
			</div>
		</nav>
	);
}
