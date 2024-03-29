import {
	TalkRoomModel,
	type TalkRoomWithUsers,
	type TalkRoomWithUsersAndMessages,
} from "~/models/talkRoom.server";
import type { User } from "@prisma/client";
import type {
	IGetMyRoomsResponse,
	ICreateRoomResponse,
	IFindOneRoomResponse,
} from "~/interfaces/talk.interface";

const talkRoomModel = TalkRoomModel.getInstance();

export async function getMyRooms(
	userId: User["id"],
): Promise<IGetMyRoomsResponse> {
	try {
		const rooms = (await talkRoomModel.getRooms({
			include: { users: { include: { user: true } } },
			where: {
				users: {
					some: {
						userId,
					},
				},
			},
		})) as TalkRoomWithUsers[];
		return {
			errors: null,
			message: "Success",
			status: 200,
			rooms,
		};
	} catch (error) {
		return {
			errors: null,
			message: "Failed to get rooms",
			status: 500,
			rooms: [],
		};
	}
}

export async function createRoom(
	userIds: number[],
): Promise<ICreateRoomResponse> {
	if (userIds.length < 2) {
		return {
			errors: { "users[]": ["Please select more than 1 user."] },
			message: "Failed to create room",
			status: 400,
			isInvaild: true,
		};
	}

	try {
		const roomId = crypto.randomUUID();
		await talkRoomModel.create({
			data: {
				roomId,
				users: {
					create: userIds.map((userId) => ({
						user: {
							connect: {
								id: userId,
							},
						},
					})),
				},
			},
		});

		return {
			errors: null,
			message: "Success",
			status: 201,
			isInvaild: false,
		};
	} catch (error) {
		console.error(error);
		return {
			errors: null,
			message: "Failed to create room",
			status: 500,
			isInvaild: true,
		};
	}
}

export async function getRoomById(
	roomId: string,
): Promise<IFindOneRoomResponse> {
	try {
		const room = (await talkRoomModel.findOne({
			include: { users: { include: { user: true } }, messages: true },
			where: { roomId },
		})) as TalkRoomWithUsersAndMessages;
		if (!room) {
			throw new Error("Room not found");
		}
		return {
			errors: null,
			message: "Success",
			status: 200,
			room,
		};
	} catch (error) {
		console.error(error);
		return {
			errors: null,
			message: "Failed to get room",
			status: 500,
		};
	}
}
