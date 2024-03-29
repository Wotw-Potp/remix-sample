import { createContext, useContext, useState } from "react";
import PopupToast, {
	type PopupToastProps,
} from "~/components/containers/PopupToast";
import type {
	IPopupToastContext,
	IPopupToastDispatchContext,
} from "~/interfaces/context.interface";

const PopupToastContext = createContext<IPopupToastContext>({
	isShowToast: false,
	message: null,
	type: "info",
});

const PopupToastDispatchContext = createContext<IPopupToastDispatchContext>({
	toggleIsShowToast: () => {},
	setMessage: () => {},
	setType: () => {},
});

export function usePopupToast() {
	return useContext(PopupToastContext);
}

export function usePopupToastDispatch() {
	return useContext(PopupToastDispatchContext);
}

export default function PopupToastProvider({
	children,
}: { children: React.ReactNode }) {
	const [isShowToast, toggleIsShowToast] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [type, setType] = useState<PopupToastProps["type"]>("info");

	const closeToast = () => {
		setMessage(null);
		toggleIsShowToast(false);
	};

	return (
		<PopupToastContext.Provider value={{ isShowToast, message, type }}>
			<PopupToastDispatchContext.Provider
				value={{ toggleIsShowToast, setMessage, setType }}
			>
				{children}
				<PopupToast
					isShow={isShowToast}
					message={message}
					type={type}
					closeToast={closeToast}
				/>
			</PopupToastDispatchContext.Provider>
		</PopupToastContext.Provider>
	);
}
