export interface ComponentProps {
	htmlFor?: string;
	label?: string;
}

export default function Label({ htmlFor, label }: ComponentProps) {
	return (
		<label htmlFor={htmlFor} className="block w-fit font-bold cursor-pointer">
			{label}
		</label>
	);
}
