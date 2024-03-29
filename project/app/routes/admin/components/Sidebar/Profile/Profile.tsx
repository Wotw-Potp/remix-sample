import type { User } from "@prisma/client";

interface ComponentProps {
	name: User["name"];
	role: User["role"];
}

export default function SidebarProfile({ name, role }: ComponentProps) {
	return (
		<div className="space-y-4">
			<div className="rounded-full overflow-hidden aspect-square max-w-20 mx-auto">
				<picture>
					<img
						src="https://picsum.photos/200/200"
						alt="sample"
						className="w-full h-full object-cover"
					/>
				</picture>
			</div>
			<div className="text-center">
				<div className="text-white font-bold">{name}</div>
				<div className="text-sm text-gray-200 capitalize">{role}</div>
			</div>
			<div className="text-center">
				<a
					href="/admin/settings"
					className="inline-block rounded-full px-4 py-2 font-bold text-gray-200 border border-gray-200 hover:bg-gray-200 hover:text-gray-600"
				>
					Edit Profile
				</a>
			</div>
		</div>
	);
}
