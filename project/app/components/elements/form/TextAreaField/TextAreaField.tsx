export interface ComponentProps {
	name?: string;
	id?: string;
	cols?: number;
	rows?: number;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	isInvalid?: boolean;
}

export default function TextAreaField(props: ComponentProps) {
	return (
		<textarea
			name={props.name}
			id={props.id}
			cols={props.cols}
			rows={props.rows}
			defaultValue={props.defaultValue}
			className={`w-full rounded border p-3 text-base focus:outline-none transition ease-in-out ${
				props.disabled
					? "bg-gray-100 text-gray-500 placeholder:text-gray-500 cursor-not-allowed"
					: "bg-white focus:ring-2 focus:ring-blue-600 placeholder:text-slate-300"
			} ${
				props.isInvalid
					? "border-red-500 focus:border-slate-200"
					: "border-slate-200"
			}`}
			disabled={props.disabled}
			required={props.required}
			placeholder={props.placeholder}
		/>
	);
}
