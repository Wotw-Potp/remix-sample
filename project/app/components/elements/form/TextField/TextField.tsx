import type {
	ChangeEvent,
	HTMLInputAutoCompleteAttribute,
	HTMLInputTypeAttribute,
} from "react";

export interface ComponentProps {
	type: HTMLInputTypeAttribute;
	defaultValue?: string;
	id?: string;
	name?: string;
	required?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	className?: string;
	isInvalid?: boolean;
	placeholder?: string;
	autoComplete?: HTMLInputAutoCompleteAttribute;
}

export default function TextField(props: ComponentProps) {
	return (
		<input
			type={props.type}
			defaultValue={props.defaultValue}
			id={props.id}
			name={props.name}
			required={props.required}
			onChange={props.onChange}
			disabled={props.disabled}
			className={`${
				props.className
			} w-full rounded border py-2 px-3 text-base focus:outline-none transition ease-in-out ${
				props.disabled
					? "bg-gray-100 text-gray-500 placeholder:text-gray-500 cursor-not-allowed"
					: "bg-white focus:ring-2 focus:ring-blue-600 placeholder:text-slate-300"
			} ${
				props.isInvalid
					? "border-red-500 focus:border-slate-200"
					: "border-slate-200"
			}`}
			placeholder={props.placeholder}
			autoComplete={props.autoComplete}
		/>
	);
}
