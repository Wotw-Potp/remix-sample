import type { Prisma } from "@prisma/client";
import { prisma } from "~/database.server";

export class MessageModel {
	private static instance?: MessageModel;

	public static getInstance(): MessageModel {
		if (!MessageModel.instance) {
			MessageModel.instance = new MessageModel();
		}
		return MessageModel.instance;
	}

	async create(args: Prisma.TalkMessageCreateArgs) {
		return await prisma.talkMessage.create(args);
	}

	async update(args: Prisma.TalkMessageUpdateArgs) {
		return await prisma.talkMessage.update(args);
	}

	async findMany(args?: Prisma.TalkMessageFindManyArgs) {
		return await prisma.talkMessage.findMany(args);
	}
}

export type TalkMessageWithAuthor = Prisma.TalkMessageGetPayload<{
	include: { author: true };
}>;
