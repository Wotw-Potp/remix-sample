import type { SerializeFrom } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import { routes } from "~/libs/routes";
import type { TalkRoomWithUsers } from "~/models/talkRoom.server";

interface ComponentProps {
	rooms: SerializeFrom<TalkRoomWithUsers>[];
	selfId: number;
}

export default function TalkRoomListTable({ rooms, selfId }: ComponentProps) {
	const navigate = useNavigate();

	return (
		<table className="table-fixed w-full shadow-lg">
			<thead className="bg-slate-300">
				<tr className="*:py-4 *:px-3 *:text-slate-600 *:text-left">
					<th className="w-4/5">Members</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{rooms.map((room, idx, self) => (
					<tr
						key={room.id}
						className={`*:py-4 *:px-3 cursor-pointer hover:bg-slate-200 ${
							idx !== self.length - 1 && "*:border-b *:border-slate-300"
						} ${idx % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
						onClick={() => navigate(`${routes.admin.TALKS}/${room.roomId}`)}
						onKeyDown={() => navigate(`${routes.admin.TALKS}/${room.roomId}`)}
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
							<DateFormatter date={room.createdAt} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
