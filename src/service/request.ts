import { IRequest, ICreateOpts, IRequestOptions, IResponse } from './interface'
import { message as Message } from 'antd'
import History from 'utils/history'

const errorMessages = {
	'401': '没有权限',
	'402': '身份过期',
	'403': '令牌不正确',
	'404': '请求路径不存在',
	'405': '请求方式错误',
	'500': '服务错误',
}
const defaultOptions = {
	method: 'GET',
	body: null,
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
	}else if(newOptions.body){
		newOptions.body = JSON.stringify(newOptions.body) 
	}
	const Auth = window.sessionStorage.getItem('Auth')
	if(Auth) {
		newOptions.headers.Auth = Auth
	}
	return newOptions
}

const request: IRequest = async (url: string, options: IRequestOptions): Promise<IResponse>=> {
	const newOptions = createRequestOptions(options)
	if(url.indexOf('http://') === -1) {
		url = `http://localhost:4000/${url}`
	}
	const response = await window.fetch(url, newOptions)
	const result = await response.json()
	if(!response.ok) {
		Message.error(errorMessages[result.status.toString()], 1200)
	}else {
		if(+result.status === 4006) {
			window.sessionStorage.removeItem('Auth')
			History.push('/login')
		}
	}
	return result;
}

export default request;