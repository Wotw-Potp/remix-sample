import type { User } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { routes } from "~/libs/routes";

export default function CreateRoomForm({
	users,
	selfId,
}: { users: SerializeFrom<User[]>; selfId: number }) {
	return (
		<Form method="post" className="w-[42ch]" action={routes.admin.TALKS}>
			<fieldset>
				<legend className="text-xl font-bold">Who invite to room ?</legend>
				<div className="mt-4 flex flex-wrap gap-5">
					{users.map(
						(user) =>
							user.id !== selfId && (
								<label
									key={user.id}
									className="px-5 py-3 rounded-full text-sm font-bold border has-[input:checked]:text-white cursor-pointer border-slate-300 bg-slate-100 hover:bg-slate-300 has-[input:checked]:bg-green-500 has-[input:checked]:border-green-500"
								>
									{user.name}
									<input
										type="checkbox"
										name="users[]"
										value={user.id}
										className="invisible hidden"
									/>
								</label>
							),
					)}
				</div>
				<input type="hidden" name="users[]" value={selfId} readOnly />
			</fieldset>
			<div className="mt-7 text-right">
				<button
					type="submit"
					className="inline-block px-4 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-colors"
				>
					Create Room
				</button>
			</div>
		</Form>
	);
}
