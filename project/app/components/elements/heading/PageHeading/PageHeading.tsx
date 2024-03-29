import type { PropsWithChildren } from "react";

export default function PageHeading({ children }: PropsWithChildren) {
	return <h1 className="text-3xl font-bold leading-relaxed">{children}</h1>;
}
