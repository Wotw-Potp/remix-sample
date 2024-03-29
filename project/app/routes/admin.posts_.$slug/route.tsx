import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import PageHeading from "~/components/elements/heading/PageHeading";
import { routes } from "~/libs/routes";
import { getPostBySlug } from "~/services/postService.server";

/* handle */
export const handle = {
	breadcrumbs: [{ path: routes.admin.POSTS, label: "Posts" }],
};
/* loader */
export async function loader({ params }: LoaderFunctionArgs) {
	const { slug } = params;
	const { post, message, errors, status } = await getPostBySlug(slug);
	if (!slug || !post) {
		throw new Error("Post not found");
	}

	return json({ post, message, errors }, { status });
}
/* ui */
export default function AdminPostsDetailRoute() {
	const { post } = useLoaderData<typeof loader>();

	return (
		<div>
			<PageHeading>{post.title}</PageHeading>
			<div className="text-right text-slate-700 text-sm">
				<DateFormatter date={post.createdAt} />
			</div>
			<div className="mt-4 pt-4 border-t border-t-slate-200">
				<p className="whitespace-pre-wrap break-all">{post.content}</p>
			</div>
		</div>
	);
}
