export default function SkeltonLoader({
	direction = "row",
}: {
	direction?: "row" | "col";
}) {
	return (
		<div role="status" className="animate-pulse">
			<div
				className={`flex ${
					direction === "row" ? "items-center gap-10" : "flex-col gap-5"
				}`}
			>
				<div
					className={`bg-gray-300 rounded aspect-[4/3] shrink-0 grid place-items-center ${
						direction === "row" ? "basis-56" : "basis-auto"
					}`}
				>
					<svg
						className="text-gray-200 w-12 h-12"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
				<div
					className={`grow ${direction === "row" ? "space-y-2" : "space-y-4"}`}
				>
					<div className="h-2 rounded-full bg-gray-200 w-1/3" />
					<div className="h-2 rounded-full bg-gray-200 w-full" />
					<div className="h-2 rounded-full bg-gray-200 w-3/5" />
					<div className="h-2 rounded-full bg-gray-200 w-1/2" />
					<div className="h-2 rounded-full bg-gray-200 w-2/5" />
					<div className="h-2 rounded-full bg-gray-200 w-2/3" />
				</div>
			</div>
			<div className="sr-only">Loading now</div>
		</div>
	);
}
