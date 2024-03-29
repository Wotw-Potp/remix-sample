import type { User } from "@prisma/client";
import type { IBaseResponse } from "./common.interface";

export interface IResisterUserResponse extends IBaseResponse<User> {
	data?: User;
}

export interface IUserResponse extends IBaseResponse<User> {
	user?: User;
}

export interface IUsersResponse extends IBaseResponse<User[]> {
	users?: User[];
}
