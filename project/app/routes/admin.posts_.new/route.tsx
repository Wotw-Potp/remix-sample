import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect } from "@remix-run/react";
import TextFieldRow from "~/components/blocks/form/TextFieldRow";
import SubmitButton from "~/components/elements/form/SubmitButton";
import PageHeading from "~/components/elements/heading/PageHeading";
import SimpleCard from "~/components/elements/card/SimpleCard/SimpleCard";
import TextAreaRow from "~/components/blocks/form/TextAreaRow";
import { createPost } from "~/services/postService.server";
import { getUserIdFromSession } from "~/services/sessionStorageService.server";
import { routes } from "~/libs/routes";

/* handle */
export const handle = {
	breadcrumbs: [{ path: routes.admin.POSTS, label: "Posts" }],
};
/* action */
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const authorId = await getUserIdFromSession(request);

	if (!authorId) {
		return json({ status: 401 }, { status: 401 });
	}

	const { status, message, errors, post } = await createPost(
		formData,
		authorId,
	);

	if (message || errors || !post) {
		return json({ status, message, errors }, { status });
	}

	return redirect(routes.admin.POSTS);
}
/* ui */
export default function AdminPostsNewRoute() {
	return (
		<div>
			<PageHeading>Add New Post</PageHeading>
			<div className="mt-5">
				<SimpleCard>
					<Form method="post" className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							<TextFieldRow
								type="text"
								name="title"
								id="title"
								label="Title"
								required
							/>
							<TextFieldRow
								type="text"
								name="slug"
								id="slug"
								label="Slug"
								required
							/>
						</div>
						<TextAreaRow
							name="content"
							id="content"
							label="Content"
							rows={14}
						/>
						<div className="text-center pt-3">
							<SubmitButton label="Submit" />
						</div>
					</Form>
				</SimpleCard>
			</div>
		</div>
	);
}
