import { IRequest, ICreateOpts, IRequestOptions, IResponse } from './interface'
import { message as Message } from 'antd'
const defaultOptions = {
	method: 'GET',
	body: {},
	mode: 'cors',
	cache: 'no-cache',
	redirect: 'follow',
	referrer: 'no-referrer',
	credentials: 'same-origin',
	headers: {
		'content-type': 'application/json'
	}
}
const createRequestOptions: ICreateOpts = (opts: IRequestOptions) => {
	const newOptions = Object.assign(defaultOptions, opts)
	
	if(['HEAD', 'GET'].includes(newOptions.method)) {
		Reflect.deleteProperty(newOptions, 'body')
	}
	return newOptions
}

const request: IRequest = async (url: string, options: IRequestOptions): Promise<IResponse>=> {
	const newOptions = createRequestOptions(options)
	const response = await window.fetch(url, newOptions)
	if(response.ok) {
		return await response.json()
	}else {
		Message.error(
			 '服务出错',
			 1200,
		)
		return {}
	}
}

export default request;