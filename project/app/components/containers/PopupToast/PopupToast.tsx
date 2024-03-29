import { useEffect } from "react";

export interface ComponentProps {
	isShow?: boolean;
	message: string | null;
	type: "success" | "error" | "info";
	closeToast?: () => void;
}

export default function PopupToast({
	isShow = false,
	message,
	type,
	closeToast,
}: ComponentProps) {
	const toastColor: Record<ComponentProps["type"], string> = {
		success: "bg-green-500",
		error: "bg-red-500",
		info: "bg-blue-500",
	};

	const toastIcon: Record<ComponentProps["type"], React.ReactNode> = {
		success: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>check circle</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		),
		error: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>exclamation circle</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
				/>
			</svg>
		),
		info: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<title>information circle</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
				/>
			</svg>
		),
	};

	useEffect(() => {
		if (!isShow || !closeToast) return;
		const timer = setTimeout(() => {
			closeToast();
		}, 4000);
		return () => clearTimeout(timer);
	}, [isShow, closeToast]);

	return (
		<>
			{isShow && (
				<div className="fixed bottom-5 right-5 z-50 transition-opacity">
					<div
						className={`relative flex items-center gap-4 w-80 p-4 text-white font-bold rounded-md shadow-lg ${toastColor[type]}`}
					>
						<div className="shrink-0">{toastIcon[type]}</div>
						<div className="leading-normal whitespace-pre-wrap break-all">
							{message}
						</div>
						{closeToast && (
							<button
								type="button"
								className="absolute right-1 top-1 cursor-pointer hover:opacity-80"
								onClick={closeToast}
							>
								<svg
									xmlns="http://www.w3.org/2000</button>/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<title>x circle</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
}
