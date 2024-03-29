import PageHeading from "~/components/elements/heading/PageHeading";
import { routes } from "~/libs/routes";

/* handle */
export const handle = {
	breadcrumb: routes.admin.DASHBOARD,
};
/* ui */
export default function AdminDashboardRoute() {
	return (
		<div>
			<PageHeading>Dashboard</PageHeading>
		</div>
	);
}
