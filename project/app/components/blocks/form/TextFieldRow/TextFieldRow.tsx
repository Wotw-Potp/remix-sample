import Label, { type LabelProps } from "~/components/elements/form/Label";
import PartialErrorMessage from "~/components/elements/form/PartialErrorMessage";
import TextField, {
	type TextFieldProps,
} from "~/components/elements/form/TextField";

export default function TextFieldRow(
	props: LabelProps & TextFieldProps & { message?: string },
) {
	return (
		<div className="space-y-2">
			<Label htmlFor={props.id} label={props.label} />
			<TextField {...props} />
			{props.isInvalid && props.message && (
				<PartialErrorMessage message={props.message} />
			)}
		</div>
	);
}
