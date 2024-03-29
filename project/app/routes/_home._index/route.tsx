import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SimpleCard from "~/components/elements/card/SimpleCard/SimpleCard";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";
import SectionHeading from "~/components/elements/heading/SectionHeading";
import { getPosts } from "~/services/postService.server";

export async function loader() {
	const { posts } = await getPosts();
	return json({ posts });
}

export default function HomeIndexRoute() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<>
			<section className="min-h-[55vh] grid place-items-center bg-gradient-to-br from-cyan-600 to-sky-600">
				<div>
					<h1 className="text-5xl font-bold text-white">Remix Web Page</h1>
				</div>
			</section>
			<section className="pt-16 pb-24">
				<div className="container mx-auto px-10">
					<SectionHeading>Posts</SectionHeading>
					<div className="grid grid-cols-3 gap-6 mt-5">
						{posts.map((post) => (
							<SimpleCard key={post.id} size="lg">
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
						))}
					</div>
				</div>
			</section>
		</>
	);
}
