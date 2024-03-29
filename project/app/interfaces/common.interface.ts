export interface IBaseResponse<T> {
	message?: string;
	status: number;
	errors: { [k in keyof T]?: string[] } | null;
}

export type TBreadcrumb = {
	path: string;
	label: string;
};

export interface IMatch {
	handle?: {
		breadcrumbs: TBreadcrumb[];
	};
	pathname: string;
}
