
interface IRequestOptions {
	method?: 'GET' | 'POST' | 'HEAD' | 'OPTIONS' | 'DELETE' | 'PUT' | 'UPDATE',
	body?: string | FormData | URLSearchParams | bufferSource | Blob | USVstring | object,
	mode?: 'cors' | 'no-cors' | 'same-origin',
	credentials?: 'omit' | 'same-origin' | 'include',
	cache?: 'default' | 'no-cache' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached',
	redirect?: 'follow' | 'error' | 'manual',
	referrer?: 'no-referrer' | 'client',
	headers?: any,
}
export type IResponse = Response | {}

export interface IRequest {
	(url: string, options: IRequestOptions): Promise<IResponse>
}
export interface ICreateOpts {
	(props: IRequestOptions): IRequestOptions
}