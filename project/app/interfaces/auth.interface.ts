import type { User } from "@prisma/client";
import type { IBaseResponse } from "./common.interface";

export interface ILoginResponse extends IBaseResponse<User> {
	userId?: number;
}

export interface ILogoutResponse extends IBaseResponse<string> {
	session: string;
}
