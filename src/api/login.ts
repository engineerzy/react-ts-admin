import request from '../service/request'

export const startLogin = ({username, password}) => {
	return request('http://localhost:4000/login', {
		body: {
			username,
			password
		},
		method: 'POST',
		mode: 'cors'
	})
}