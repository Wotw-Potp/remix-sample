import { PostModel } from "~/models/post.server";
import type {
	IPostResponse,
	IPostsResponse,
	ICreatePostResponse,
} from "~/interfaces/post.interface";

const postModel = PostModel.getInstance();

export async function getPosts(): Promise<IPostsResponse> {
	return {
		status: 200,
		errors: null,
		posts: await postModel.findMany({}),
	};
}

export async function getPostsByAuthorId(
	authorId: number,
): Promise<IPostsResponse> {
	return {
		status: 200,
		errors: null,
		posts: await postModel.findMany({ where: { authorId } }),
	};
}

export async function createPost(
	formData: FormData,
	authorId: number,
): Promise<ICreatePostResponse> {
	const title = formData.get("title")?.toString();
	const slug = formData.get("slug")?.toString();
	const content = formData.get("content")?.toString();

	if (!title || !slug || !content) {
		return {
			status: 400,
			errors: {
				title: !title ? ["Title is required"] : undefined,
				slug: !slug ? ["Slug is required"] : undefined,
				content: !content ? ["Content is required"] : undefined,
			},
		};
	}

	// If the slug includes spaces, replace them with hyphens and lowercase the slug
	const formattedSlug = slug.replace(/\s+/g, "-").toLowerCase();

	// Remove any special characters from the slug
	const sanitizedSlug = formattedSlug.replace(/[^\w-]/g, "");

	try {
		const post = await postModel.create({
			slug: sanitizedSlug,
			title,
			content,
			author: { connect: { id: authorId } },
		});
		return {
			status: 200,
			errors: null,
			post,
		};
	} catch (error) {
		console.error(error);
		return {
			message: "An error occurred while creating the post",
			status: 500,
			errors: null,
		};
	}
}

export async function getPostBySlug(slug?: string): Promise<IPostResponse> {
	try {
		const post = await postModel.findOne({ where: { slug } });
		if (!post) {
			return {
				status: 404,
				message: "Post not found",
				errors: null,
			};
		}
		return {
			status: 200,
			errors: null,
			post,
		};
	} catch (error) {
		console.error(error);
		return {
			status: 400,
			message: "An error occurred while finding the post",
			errors: null,
		};
	}
}
