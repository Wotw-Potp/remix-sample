import type { User } from "@prisma/client";
import { Form } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/node";
import TextFieldRow from "~/components/blocks/form/TextFieldRow";
import SubmitButton from "~/components/elements/form/SubmitButton";

export default function ProfileEditForm({
	user,
}: { user: SerializeFrom<User> }) {
	return (
		<Form method="post" className="space-y-5">
			<TextFieldRow
				label="Username"
				type="text"
				defaultValue={user.name}
				id="name"
				name="name"
			/>
			<TextFieldRow
				label="Email"
				type="email"
				defaultValue={user.email}
				id="email"
				name="email"
			/>
			<input type="hidden" name="userId" value={user.id} readOnly />
			<div className="text-right">
				<SubmitButton label="save" />
			</div>
		</Form>
	);
}
