import {
	type Prisma,
	type Post as PostEntity,
	PostStatus,
} from "@prisma/client";
import { prisma } from "~/database.server";

export class PostModel {
	private static instance?: PostModel;
	private post?: PostEntity;

	public static getInstance() {
		if (!PostModel.instance) {
			PostModel.instance = new PostModel();
		}
		return PostModel.instance;
	}

	public set model(v: PostEntity | undefined) {
		this.post = v;
	}

	public get model() {
		return this.post;
	}

	private getBaseWhereParams<T extends Prisma.PostWhereInput>(
		where?: Prisma.PostWhereInput,
	): T {
		return {
			...where,
			status: { not: PostStatus.DELETED },
      deletedAt: null,
		} as T;
	}

	async findOne({ select, where }: Prisma.PostFindUniqueArgs) {
		const whereParam =
			this.getBaseWhereParams<Prisma.PostWhereUniqueInput>(where);
		return await prisma.post.findUnique({ select, where: whereParam });
	}

	async findMany({ select, where }: Prisma.PostFindManyArgs) {
		const whereParam = this.getBaseWhereParams<Prisma.PostWhereInput>(where);
		return await prisma.post.findMany({ select, where: whereParam });
	}

	async create(data: Prisma.PostCreateInput) {
		return await prisma.post.create({
			data: { ...data, status: PostStatus.PUBLISHED },
		});
	}

	async update({ where, data }: Prisma.PostUpdateArgs) {
		const whereParam =
			this.getBaseWhereParams<Prisma.PostWhereUniqueInput>(where);
		return await prisma.post.update({ where: whereParam, data });
	}

	async softDelete({ where }: Prisma.PostDeleteArgs) {
		const whereParam =
			this.getBaseWhereParams<Prisma.PostWhereUniqueInput>(where);
		return await prisma.post.update({
			where: whereParam,
			data: { status: PostStatus.DELETED, deletedAt: new Date() },
		});
	}
}
