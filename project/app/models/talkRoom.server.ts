import type { Prisma, TalkRoom as TalkRoomEntity } from "@prisma/client";
import { prisma } from "~/database.server";

export class TalkRoomModel {
	private static instance?: TalkRoomModel;
	private talkRoom?: TalkRoomEntity;

	public static getInstance(): TalkRoomModel {
		if (!TalkRoomModel.instance) {
			TalkRoomModel.instance = new TalkRoomModel();
		}
		return TalkRoomModel.instance;
	}

	public set model(v: TalkRoomEntity | undefined) {
		this.talkRoom = v;
	}

	public get model() {
		return this.talkRoom;
	}

	async getRooms(args?: Prisma.TalkRoomFindManyArgs) {
		return await prisma.talkRoom.findMany(args);
	}

	async create(args: Prisma.TalkRoomCreateArgs) {
		return await prisma.talkRoom.create(args);
	}

	async update(args: Prisma.TalkRoomUpdateArgs) {
		return await prisma.talkRoom.update(args);
	}

	async findOne(args: Prisma.TalkRoomFindUniqueArgs) {
		return await prisma.talkRoom.findUnique(args);
	}

	async delete(args: Prisma.TalkRoomDeleteArgs) {
		return await prisma.talkRoom.delete(args);
	}
}

export type TalkRoomWithUsers = Prisma.TalkRoomGetPayload<{
	include: { users: { include: { user: true } } };
}>;

export type TalkRoomWithUsersAndMessages = Prisma.TalkRoomGetPayload<{
	include: { users: { include: { user: true } }; messages: true };
}>;
