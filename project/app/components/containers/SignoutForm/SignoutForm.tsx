import { useFetcher } from "@remix-run/react";
import SubmitButton from "~/components/elements/form/SubmitButton";

interface ComponentProps {
	method?: "post" | "get" | "put" | "delete";
	action?: string;
}

export default function SignoutForm({
	method = "post",
	action,
}: ComponentProps) {
	const fetch = useFetcher();
	const isSubmitting = fetch.state === "submitting";

	return (
		<fetch.Form method={method} action={action}>
			<SubmitButton label="Sign out" isLoading={isSubmitting} />
		</fetch.Form>
	);
}
