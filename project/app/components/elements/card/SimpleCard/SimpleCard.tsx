import type { PropsWithChildren } from "react";

interface ComponentProps {
	size?: "sm" | "lg" | "full";
}

export default function SimpleCard({
	size = "full",
	children,
}: PropsWithChildren<ComponentProps>) {
	return (
		<div
			className={`bg-white rounded-md shadow-lg h-full ${
				size === "full" && "w-full p-10"
			} ${size === "sm" && "px-5 py-8 basis-60"} ${
				size === "lg" && "p-8 basis-80"
			}`}
		>
			{children}
		</div>
	);
}
