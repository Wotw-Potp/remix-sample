import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
	redirectDocument,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PageHeading from "~/components/elements/heading/PageHeading";
import { useOverlayModalDispatch } from "~/contexts/overlayModalContext";
import { getUserIdFromSession } from "~/services/sessionStorageService.server";
import { getMyRooms, createRoom } from "~/services/talkService.server";
import CreateRoomForm from "./components/CreateRoomForm";
import { getUsers } from "~/services/userService.server";
import TalkRoomListTable from "./components/TalkRoomsListTable";
import { routes } from "~/libs/routes";
/* action */
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const users = formData
		.getAll("users[]")
		.map((formValue) => Number.parseInt(formValue.toString()));

	const { isInvaild, status, message } = await createRoom(users);
	if (isInvaild) {
		return json({ message }, { status });
	}
	return redirectDocument(routes.admin.TALKS);
}
/* loader */
export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getUserIdFromSession(request);
	if (!userId) {
		throw new Error("Unauthorized");
	}
	const { rooms, status } = await getMyRooms(userId);
	const { users } = await getUsers();
	return json({ rooms, users: users || [], userId }, { status });
}
/* ui */
export default function AdminTalksRoute() {
	const { rooms, users, userId } = useLoaderData<typeof loader>();
	const { toggleIsModalOpen, setModalContent } = useOverlayModalDispatch();

	return (
		<div>
			<div className="flex justify-between items-center">
				<PageHeading>Talks</PageHeading>
				<div className="shrink-0">
					<button
						type="button"
						className="inline-block px-4 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-colors"
						onClick={() => {
							setModalContent(<CreateRoomForm users={users} selfId={userId} />);
							toggleIsModalOpen(true);
						}}
					>
						Create New Room
					</button>
				</div>
			</div>
			<div className="mt-5">
				{rooms.length > 0 ? (
					<TalkRoomListTable rooms={rooms} selfId={userId} />
				) : (
					<div className="text-center text-xl text-slate-500">
						You don&apos;t have any rooms yet.
						<br />
						Let&apos;s create one!
					</div>
				)}
			</div>
		</div>
	);
}
