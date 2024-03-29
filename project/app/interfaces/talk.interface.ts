import type { IBaseResponse } from "~/interfaces/common.interface";
import type {
	TalkRoomWithUsers,
	TalkRoomWithUsersAndMessages,
} from "~/models/talkRoom.server";
import type { TalkRoom } from "@prisma/client";

export interface IGetMyRoomsResponse extends IBaseResponse<TalkRoom> {
	rooms: TalkRoomWithUsers[];
}

export interface ICreateRoomResponse
	extends IBaseResponse<{ "users[]": number[] }> {
	isInvaild: boolean;
}

export interface IFindOneRoomResponse extends IBaseResponse<TalkRoomWithUsers> {
	room?: TalkRoomWithUsersAndMessages;
}

export interface IDeleteRoomResponse extends IBaseResponse<null> {}
