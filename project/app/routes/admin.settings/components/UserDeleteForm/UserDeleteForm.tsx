import { useFetcher } from "@remix-run/react";
import SubmitButton from "~/components/elements/form/SubmitButton";
import type { User } from "@prisma/client";

export default function UserDeleteForm({ userId }: { userId: User["id"] }) {
	const fetcher = useFetcher();
	const isSubmitting = fetcher.state === "submitting";

	return (
		<fetcher.Form method="delete" action={`/admin/users/${userId}/delete`}>
			<SubmitButton
				label="confirm & continue"
				theme="danger"
				isLoading={isSubmitting}
			/>
		</fetcher.Form>
	);
}
