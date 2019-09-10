import request from '../service/request'

export const startLogin = (options: object) => {
	return request('http://localhost:4000/login', {
		body: JSON.stringify(options),
		method: 'GET',
		mode: 'cors'
	})
}