import { Form } from "@remix-run/react";
import TextAreaField from "~/components/elements/form/TextAreaField";

interface ComponentProps {
	action: string;
}

export default function MessageForm({ action }: ComponentProps) {
	return (
		<Form method="post" className="flex items-end gap-8" action={action}>
			<div className="grow">
				<TextAreaField name="message" rows={6} required />
			</div>
			<div className="shrink-0">
				<button
					type="submit"
					className="w-12 h-12 p-3 text-white rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-full"
					>
						<title>paper-airplane</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
						/>
					</svg>
				</button>
			</div>
		</Form>
	);
}
