import type { SerializeFrom } from "@remix-run/node";
import type { TalkMessageWithAuthor } from "~/models/message.server";
import AvatarImage from "~/assets/avatar-placeholder.jpg";
import AvatarImage02 from "~/assets/avatar-placeholder-2.jpg";
import DateFormatter from "~/components/elements/frontFormatter/DateFormatter";

interface ComponentProps {
	message: SerializeFrom<TalkMessageWithAuthor>;
	isMine: boolean;
}

export default function MessageItem({ message, isMine }: ComponentProps) {
	return (
		<div
			className={`flex gap-4 items-start ${
				isMine ? "flex-row-reverse" : "flex-row"
			}`}
		>
			<div className="shrink-0 flex flex-col gap-2 items-center w-24">
				<div className="w-12 h-12 rounded-full overflow-hidden">
					<picture>
						<img
							src={isMine ? AvatarImage : AvatarImage02}
							alt={message.author.name}
							loading="lazy"
						/>
					</picture>
				</div>
				<div className="text-xs text-slate-700 font-bold text-center w-full overflow-hidden text-ellipsis whitespace-nowrap">
					{message.author.name}
				</div>
			</div>
			<div className="basis-[52ch] grow-0">
				<div className="bg-white p-3 rounded-lg whitespace-pre break-all">
					{message.content}
				</div>
				<div
					className={`text-xs text-slate-500 mt-1 ${!isMine && "text-right"}`}
				>
					<DateFormatter date={message.createdAt} />
				</div>
			</div>
		</div>
	);
}
