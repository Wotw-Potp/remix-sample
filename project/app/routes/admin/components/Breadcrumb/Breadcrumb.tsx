import { Link } from "@remix-run/react";
import type { TBreadcrumb } from "~/interfaces/common.interface";

interface ComponentProps {
	breadcrumbs: TBreadcrumb[];
}

export default function Breadcrumb({ breadcrumbs }: ComponentProps) {
	return (
		<>
			{breadcrumbs.length > 0 && (
				<nav className="flex flex-wrap gap-3 text-sm text-slate-500">
					{breadcrumbs.map((breadcrumb) => (
						<Link
							key={breadcrumb.path}
							to={breadcrumb.path}
							className="font-bold underline underline-offset-2 hover:no-underline"
						>
							{`< ${breadcrumb.label}`}
						</Link>
					))}
				</nav>
			)}
		</>
	);
}
