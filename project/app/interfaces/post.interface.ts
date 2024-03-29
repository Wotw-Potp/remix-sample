import type { IBaseResponse } from "~/interfaces/common.interface";
import type { Post } from "@prisma/client";

export interface IPostsResponse extends IBaseResponse<Post[]> {
	posts: Post[];
}

export interface ICreatePostResponse extends IBaseResponse<Post> {
	post?: Post;
}

export interface IPostResponse extends IBaseResponse<Post> {
	post?: Post;
}
