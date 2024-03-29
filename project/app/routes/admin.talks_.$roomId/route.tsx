import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
	redirectDocument,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRoomById } from "~/services/talkService.server";
import MessageForm from "./components/MessageForm";
import MessageItem from "./components/MessageItem";
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

	return redirectDocument(`${routes.admin.TALKS}/${roomId}`);
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
						<MessageItem
							key={message.id}
							message={message}
							isMine={message.authorId === userId}
						/>
					))}
				</div>
			</div>
			<div className="shrink-0">
				<MessageForm action={`${routes.admin.TALKS}/${room.roomId}`} />
			</div>
		</div>
	);
}
