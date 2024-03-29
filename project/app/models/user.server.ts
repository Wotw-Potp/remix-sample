import type { Prisma, User as UserEntity } from "@prisma/client";
import { prisma } from "~/database.server";

export class UserModel {
	private static instance?: UserModel;
	private user?: UserEntity;

	public static getInstance() {
		if (!UserModel.instance) {
			UserModel.instance = new UserModel();
		}
		return UserModel.instance;
	}

	public set model(v: UserEntity | undefined) {
		this.user = v;
	}

	public get model() {
		return this.user;
	}

	async findOne({ where }: { where: Prisma.UserWhereInput }) {
		return await prisma.user.findFirst({ where });
	}

	async findUnique({
		where,
	}: Prisma.UserFindUniqueArgs): Promise<UserEntity | null> {
		return await prisma.user.findUnique({ where });
	}

	async findMany(
		select?: Prisma.UserSelectScalar,
		where?: Prisma.UserWhereInput,
	): Promise<UserEntity[]> {
		return await prisma.user.findMany({ select, where });
	}

	async create(data: Prisma.UserCreateInput): Promise<UserEntity | null> {
		const user = await this.findUnique({ where: { email: data.email } });
		if (user) {
			return null;
		}
		return await prisma.user.create({ data });
	}

	async update({
		where,
		data,
	}: Prisma.UserUpdateArgs): Promise<UserEntity | null> {
		return await prisma.user.update({ where, data });
	}

	async updateLastLoggedAt() {
		if (this.user) {
			await prisma.user.update({
				where: { id: this.user.id },
				data: { lastLoggedAt: new Date() },
			});
		}
	}

	async delete({ where }: Prisma.UserDeleteArgs) {
		return await prisma.user.delete({ where });
	}
}
