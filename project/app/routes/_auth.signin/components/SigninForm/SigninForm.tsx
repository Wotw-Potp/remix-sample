import { Form, useNavigation } from "@remix-run/react";
import TextFieldRow from "~/components/blocks/form/TextFieldRow";
import FormErrorMessage from "~/components/elements/form/FormErrorMessage";
import SubmitButton from "~/components/elements/form/SubmitButton";
import { routes } from "~/libs/routes";
import type { ILoginResponse } from "~/interfaces/auth.interface";

interface ComponentProps {
	errors?: ILoginResponse["errors"];
	message: ILoginResponse["message"];
}

export default function SigninForm({ errors, message }: ComponentProps) {
	const navigation = useNavigation();
	const isSubmitting = navigation.formAction === routes.SIGNIN;

	return (
		<Form method="post" className="space-y-4">
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
				autoComplete="current-password"
			/>
			{message && <FormErrorMessage message={message} />}
			<div className="pt-3 text-center">
				<SubmitButton label="Signin" isLoading={isSubmitting} />
			</div>
		</Form>
	);
}
