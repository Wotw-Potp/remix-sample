import type { PropsWithChildren } from "react";

interface ComponentProps {
	isOpen?: boolean;
	onCloseHandler: () => void;
}

export default function OverlayModal({
	isOpen,
	onCloseHandler,
	children,
}: PropsWithChildren<ComponentProps>) {
	return (
		<>
			{isOpen && (
				<div
					className="fixed z-40 inset-0 bg-slate-900 bg-opacity-30 grid place-items-center"
					onClick={onCloseHandler}
					onKeyDown={onCloseHandler}
					onKeyUp={onCloseHandler}
					tabIndex={0}
					role="button"
				>
					<div
						className="bg-white p-10 rounded-md min-w-[28ch]"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						onKeyUp={(e) => e.stopPropagation()}
						role="textbox"
						tabIndex={0}
					>
						{children}
					</div>
				</div>
			)}
		</>
	);
}
