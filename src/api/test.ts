import request from '../service/request'

export const tokenTest = () => {
	return request('api/errorToken', {
		method: 'GET',
		mode: 'cors'
	})
}