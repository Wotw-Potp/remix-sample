interface ComponentProps {
	label?: string;
	disabled?: boolean;
	isLoading?: boolean;
	theme?: "default" | "danger" | "success";
}

export default function SubmitButton({
	label = "submit",
	disabled,
	isLoading,
	theme = "default",
}: ComponentProps) {
	const themeClasses: Record<
		typeof theme,
		{ base: string; active: string; loaderBase: string; loaderPing: string }
	> = {
		default: {
			base: "bg-blue-700",
			active: "hover:bg-blue-800",
			loaderBase: "bg-sky-600",
			loaderPing: "bg-sky-300",
		},
		danger: {
			base: "bg-red-600",
			active: "hover:bg-red-700",
			loaderBase: "bg-red-800",
			loaderPing: "bg-red-300",
		},
		success: {
			base: "bg-green-600",
			active: "hover:bg-green-700",
			loaderBase: "bg-green-800",
			loaderPing: "bg-green-300",
		},
	};

	return (
		<button
			type="submit"
			className={`relative inline-block rounded-md text-white font-bold py-3 px-6 transition ease-in-out ${
				disabled ? "cursor-not-allowed bg-slate-600" : themeClasses[theme].base
			} ${
				isLoading ? "bg-opacity-70" : !disabled && themeClasses[theme].active
			}`}
			disabled={disabled || isLoading}
		>
			{label}
			{isLoading && (
				<div
					className={`absolute -right-1 -top-1 w-3 h-3 rounded-full ${themeClasses[theme].loaderBase}`}
				>
					<div
						className={`absolute inset-0 rounded-full animate-ping ${themeClasses[theme].loaderPing}`}
					/>
				</div>
			)}
		</button>
	);
}
