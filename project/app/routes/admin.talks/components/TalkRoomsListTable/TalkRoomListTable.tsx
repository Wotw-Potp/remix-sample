import type { SerializeFrom } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import { routes } from "~/libs/routes";
import type { TalkRoomWithUsers } from "~/models/talkRoom.server";

interface ComponentProps {
	rooms: SerializeFrom<TalkRoomWithUsers>[];
	selfId: number;
}

export default function TalkRoomListTable({ rooms, selfId }: ComponentProps) {
	return (
		<table className="w-full shadow-lg">
			<thead className="bg-slate-300">
				<tr className="*:py-4 *:px-3 *:text-slate-600 *:text-left">
					<th>Members</th>
					<th className="w-1/5">Last Action At</th>
					<th className="w-1/6">Actions</th>
				</tr>
			</thead>
			<tbody>
				{rooms.map((room, idx, self) => (
					<tr
						key={room.id}
						className={`*:py-4 *:px-3 ${
							idx !== self.length - 1 && "*:border-b *:border-slate-300"
						} ${idx % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
					>
						<td>
							<div className="flex flex-wrap gap-2">
								{room.users.map((user) => (
									<span
										key={user.userId}
										className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-800 text-sm"
									>
										{user.userId === selfId ? "You" : user.user.name}
									</span>
								))}
							</div>
						</td>
						<td>
							<DateFormatter date={room.updatedAt} />
						</td>
						<td>
							<div className="flex flex-wrap gap-5">
								<Link
									to={`${routes.admin.TALKS}/${room.roomId}`}
									className="inline-block p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-100"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<title>arrow-top-right-on-square</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
										/>
									</svg>
								</Link>
								<Form
									method="delete"
									action={`${routes.admin.TALKS}/${room.roomId}/delete`}
									onSubmit={(e) => {
										e.preventDefault();
										if (confirm("Are you sure you want to delete this room?")) {
											e.currentTarget.submit();
										}
									}}
								>
									<button
										type="submit"
										className="inline-block p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-100"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<title>Trash</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</Form>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
