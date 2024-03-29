import type { PropsWithChildren } from "react";

export default function SectionHeading({ children }: PropsWithChildren) {
	return <h2 className="text-2xl font-bold leading-relaxed">{children}</h2>;
}
