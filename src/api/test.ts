import request from '../service/request'

export const tokenTest = () => {
	return request('http://localhost:4000/errorToken', {
		method: 'GET',
		mode: 'cors'
	})
}