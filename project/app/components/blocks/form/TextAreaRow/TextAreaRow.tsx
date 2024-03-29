import TextAreaField, {
	type TextAreaFieldProps,
} from "~/components/elements/form/TextAreaField";
import Label, { type LabelProps } from "~/components/elements/form/Label";
import PartialErrorMessage from "~/components/elements/form/PartialErrorMessage";

export default function TextAreaRow(
	props: TextAreaFieldProps & LabelProps & { message?: string },
) {
	return (
		<div className="space-y-2">
			<Label htmlFor={props.id} label={props.label} />
			<TextAreaField {...props} />
			{props.isInvalid && props.message && (
				<PartialErrorMessage message={props.message} />
			)}
		</div>
	);
}
