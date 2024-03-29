import { Form, useNavigation } from "@remix-run/react";
import TextFieldRow from "~/components/blocks/form/TextFieldRow";
import FormErrorMessage from "~/components/elements/form/FormErrorMessage";
import SubmitButton from "~/components/elements/form/SubmitButton";
import type { IResisterUserResponse } from "~/interfaces/user.interface";

interface ComponentProps {
	errors?: IResisterUserResponse["errors"];
	message?: IResisterUserResponse["message"];
}

export default function SignupForm({ errors, message }: ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<Form method="post" className="space-y-4">
			<TextFieldRow
				type="text"
				id="name"
				name="name"
				label="Name"
				required
				isInvalid={typeof errors?.name !== "undefined"}
				autoComplete="username"
			/>
			<TextFieldRow
				type="email"
				id="email"
				name="email"
				label="Email"
				required
				isInvalid={typeof errors?.email !== "undefined"}
				autoComplete="email"
			/>
			<TextFieldRow
				type="password"
				id="password"
				name="password"
				label="Password"
				isInvalid={typeof errors?.password !== "undefined"}
				autoComplete="new-password"
			/>
			<TextFieldRow
				type="password"
				id="passwordConfirmation"
				name="passwordConfirmation"
				label="Confirm Password"
        autoComplete="new-password"
			/>
			{message && <FormErrorMessage message={message} />}
			<div className="pt-3 text-center">
				<SubmitButton label="Signup" isLoading={isSubmitting} />
			</div>
		</Form>
	);
}
