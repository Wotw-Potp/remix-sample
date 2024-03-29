type TOptionProps = {
	value: string;
	label: string;
	selected?: boolean;
};

export interface ComponentProps {
	name?: string;
	id?: string;
	options: TOptionProps[];
	defaultValue?: string;
	required?: boolean;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	isInvalid?: boolean;
}

function Option({ value, label, selected }: TOptionProps) {
	return (
		<option value={value} selected={selected}>
			{label}
		</option>
	);
}

export default function SelectField(props: ComponentProps) {
	return (
		<select
			name={props.name}
			id={props.id}
			required={props.required}
			className={`${
				props.className
			} w-full rounded border py-2 px-3 text-base focus:outline-none transition ease-in-out ${
				props.disabled
					? "bg-gray-100 text-gray-500 cursor-not-allowed"
					: "bg-white focus:ring-2 focus:ring-blue-600 cursor-pointer"
			} ${
				props.isInvalid
					? "border-red-500 focus:border-slate-200"
					: "border-slate-200"
			}`}
			disabled={props.disabled}
		>
			{typeof props.placeholder !== "undefined" && (
				<option
					value=""
					disabled
					selected={typeof props.defaultValue === "undefined"}
				>
					{props.placeholder}
				</option>
			)}
			{props.options.map((option) => (
				<Option
					key={option.value}
					value={option.value}
					label={option.label}
					selected={option.value === props.defaultValue}
				/>
			))}
		</select>
	);
}
