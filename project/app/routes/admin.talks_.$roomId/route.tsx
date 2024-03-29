import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRoomById } from "~/services/talkService.server";
import MessageForm from "./components/MessageForm";
import { routes } from "~/libs/routes";
import {
	createMessage,
	getRoomMessages,
} from "~/services/messageService.server";
import { getUserIdFromSession } from "~/services/sessionStorageService.server";
/* handle */
export const handle = {
	breadcrumbs: [{ path: routes.admin.TALKS, label: "Talks" }],
};
/* action */
export async function action({ request, params }: ActionFunctionArgs) {
	const { roomId } = params;
	const userId = await getUserIdFromSession(request);
	if (!userId || !roomId) {
		return json({ status: 401 }, { status: 401 });
	}
	const formData = await request.formData();
	const content = formData.get("message") as string | null;
	const { isInvalid, status, message } = await createMessage(
		content,
		roomId,
		userId,
	);
	if (isInvalid) {
		return json({ status, message }, { status });
	}

	return redirect(`${routes.admin.TALKS}/${roomId}`, { status });
}
/* loader */
export async function loader({ request, params }: LoaderFunctionArgs) {
	const { roomId } = params;
	const userId = await getUserIdFromSession(request);
	if (!userId || !roomId) {
		throw new Error("Invalid id");
	}
	const { room, status } = await getRoomById(roomId);
	if (!room) {
		throw new Error("Room not found");
	}
	const { messages } = await getRoomMessages(roomId);
	return json({ room, messages, userId }, { status });
}
/* ui */
export default function AdminTalkRoomRoute() {
	const { room, messages, userId } = useLoaderData<typeof loader>();

	return (
		<div className="flex flex-col gap-10 min-h-[80vh]">
			<div className="grow">
				<div className="grid gap-8">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex gap-4 items-center ${
								message.authorId === userId ? "flex-row-reverse" : "flex-row"
							}`}
						>
							<div className="shrink-0 flex flex-col gap-2 items-center">
								<div className="w-12 h-12 rounded-full overflow-hidden">
									<picture>
										<img
											src="https://picsum.photos/200/200"
											alt={message.author.name}
											loading="lazy"
										/>
									</picture>
								</div>
								<div className="text-xs text-slate-700 font-bold text-center">
									{message.author.name}
								</div>
							</div>
							<div className="basis-[52ch] grow-0">
								<div className="bg-white p-3 rounded-lg whitespace-pre break-all">
									{message.content}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="shrink-0">
				<MessageForm action={`${routes.admin.TALKS}/${room.roomId}`} />
			</div>
		</div>
	);
}
