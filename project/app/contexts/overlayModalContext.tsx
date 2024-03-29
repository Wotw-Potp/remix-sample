import { createContext, useContext, useState } from "react";
import OverlayModal from "~/components/containers/OverlayModal";
import type {
	IOverlayModalContext,
	IOverlayModalDispatchContext,
} from "~/interfaces/context.interface";

const OverlayModalContext = createContext<IOverlayModalContext>({
	isModalOpen: false,
});

const OverlayModalDispatchContext = createContext<IOverlayModalDispatchContext>(
	{
		toggleIsModalOpen: () => {},
		setModalContent: () => {},
	},
);

export function useOverlayModal() {
	return useContext(OverlayModalContext);
}

export function useOverlayModalDispatch() {
	return useContext(OverlayModalDispatchContext);
}

export default function OverlayModalProvider({
	children,
}: { children: React.ReactNode }) {
	const [isModalOpen, toggleIsModalOpen] = useState<boolean>(false);
	const [content, setModalContent] = useState<React.ReactNode | undefined>();

	return (
		<OverlayModalContext.Provider value={{ isModalOpen, content }}>
			<OverlayModalDispatchContext.Provider
				value={{ toggleIsModalOpen, setModalContent }}
			>
				{children}
				<OverlayModal
					isOpen={isModalOpen}
					onCloseHandler={() => {
						toggleIsModalOpen(false);
						setModalContent(undefined);
					}}
				>
					{content}
				</OverlayModal>
			</OverlayModalDispatchContext.Provider>
		</OverlayModalContext.Provider>
	);
}
