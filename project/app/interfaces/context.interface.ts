import type { Dispatch, SetStateAction } from "react";
import type { PopupToastProps } from "~/components/containers/PopupToast";

export interface IOverlayModalContext {
	isModalOpen: boolean;
	content?: React.ReactNode;
}

export interface IOverlayModalDispatchContext {
	toggleIsModalOpen: Dispatch<SetStateAction<boolean>>;
	setModalContent: Dispatch<SetStateAction<React.ReactNode>>;
}

export interface IPopupToastContext {
	isShowToast?: boolean;
	message: PopupToastProps["message"];
	type: PopupToastProps["type"];
}

export interface IPopupToastDispatchContext {
	toggleIsShowToast: Dispatch<SetStateAction<boolean>>;
	setMessage: Dispatch<SetStateAction<string | null>>;
	setType: Dispatch<SetStateAction<PopupToastProps["type"]>>;
}

export type TAdminOutletContexts = IOverlayModalContext &
	IOverlayModalDispatchContext &
	IPopupToastContext &
	IPopupToastDispatchContext;

export type TAuthOutletContexts = IPopupToastContext &
	IPopupToastDispatchContext;
