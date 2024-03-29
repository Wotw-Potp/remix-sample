import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import type { IUsersResponse } from "~/interfaces/user.interface";
import { routes } from "~/libs/routes";

export default function UserListTable() {
	const { users } = useRouteLoaderData("routes/admin.users") as IUsersResponse;
	const navigate = useNavigate();

	return (
		<>
			<table className="w-full table-fixed shadow-lg">
				<thead className="bg-slate-300">
					<tr className="*:py-4 *:px-3 *:text-slate-600 *:text-left">
						<th>Name</th>
						<th>Email</th>
						<th className="w-1/6">Role</th>
						<th className="w-1/5">Last Logged</th>
					</tr>
				</thead>
				<tbody>
					{typeof users !== "undefined" &&
						users.map((user, idx, self) => (
							<tr
								key={user.id}
								className={`*:py-4 *:px-3 cursor-pointer hover:bg-slate-200 ${
									idx === self.length - 1 ? "" : "*:border-b *:border-slate-300"
								} ${idx % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
								onClick={() =>
									navigate(encodeURI(`${routes.admin.USERS}/${user.id}`))
								}
								onKeyDown={() =>
									navigate(encodeURI(`${routes.admin.USERS}/${user.id}`))
								}
							>
								<td className="whitespace-nowrap text-ellipsis overflow-hidden">
									{user.name}
								</td>
								<td>{user.email}</td>
								<td className="text-sm font-bold">{user.role}</td>
								<td>
									<DateFormatter date={user.lastLoggedAt} />
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
}
