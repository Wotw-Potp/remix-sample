import {
	MessageModel,
	type TalkMessageWithAuthor,
} from "~/models/message.server";
import type {
	ICreateMessageResponse,
	IGetRoomMessagesResponse,
} from "~/interfaces/message.interface";

const messageModel = MessageModel.getInstance();

export async function getRoomMessages(
	roomId: string,
): Promise<IGetRoomMessagesResponse> {
	try {
		const messages = (await messageModel.findMany({
			where: { roomId },
			include: { author: true },
		})) as TalkMessageWithAuthor[];
		return {
			errors: null,
			message: "Success",
			status: 200,
			messages,
		};
	} catch (error) {
		console.error(error);
		return {
			errors: null,
			message: "Failed to get messages",
			status: 500,
			messages: [],
		};
	}
}

export async function createMessage(
	content: string | null,
	roomId: string,
	userId: number,
): Promise<ICreateMessageResponse> {
	try {
		if (!content) {
			throw new Error("Content is required");
		}
		await messageModel.createMessage({
			data: {
				content,
				roomId,
				authorId: userId,
			},
		});
		return {
			errors: null,
			message: "Success to create message",
			status: 201,
			isInvalid: false,
		};
	} catch (error) {
		console.error(error);
		return {
			errors: null,
			message: "Failed to create message",
			status: 500,
			isInvalid: true,
		};
	}
}
