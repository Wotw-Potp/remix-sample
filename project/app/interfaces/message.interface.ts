import type { IBaseResponse } from "~/interfaces/common.interface";
import type { TalkMessageWithAuthor } from "~/models/message.server";

export interface ICreateMessageResponse
	extends IBaseResponse<{ message: string }> {
	isInvalid: boolean;
}

export interface IGetRoomMessagesResponse extends IBaseResponse<null> {
	messages: TalkMessageWithAuthor[];
}
