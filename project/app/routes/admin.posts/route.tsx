import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import SimpleCard from "~/components/elements/card/SimpleCard/SimpleCard";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import PageHeading from "~/components/elements/heading/PageHeading";
import { routes } from "~/libs/routes";
import { getPostsByAuthorId } from "~/services/postService.server";
import { getUserIdFromSession } from "~/services/sessionStorageService.server";

/* loader */
export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getUserIdFromSession(request);
	if (!userId) {
		return json({ posts: [] });
	}
	const { posts } = await getPostsByAuthorId(userId);
	return json({ posts });
}
/* ui */
export default function AdminPostsRoute() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div>
			<div className="flex justify-between items-center">
				<PageHeading>Posts</PageHeading>
				<div className="shrink-0">
					<Link
						to={routes.admin.POSTS_NEW}
						className="inline-block px-4 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition-colors"
					>
						Add New Post
					</Link>
				</div>
			</div>
			<div className="mt-5 grid grid-cols-3 gap-6">
				{posts.map((post) => (
					<Link
						key={post.id}
						to={encodeURI(`${routes.admin.POSTS}/${post.slug}`)}
						className="transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
					>
						<SimpleCard size="lg">
							<div className="space-y-4">
								<h2 className="text-lg font-bold leading-normal">
									{post.title}
								</h2>
								<p className="text-sm text-gray-600 whitespace-pre-wrap break-all">
									{post.content.slice(0, 40)}...
								</p>
								<p className="text-right text-xs">
									<DateFormatter date={post.createdAt} />
								</p>
							</div>
						</SimpleCard>
					</Link>
				))}
			</div>
		</div>
	);
}
