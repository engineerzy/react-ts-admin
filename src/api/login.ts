import request from '../service/request'

export const startLogin = ({username, password}) => {
	return request('login', {
		body: {
			username,
			password
		},
		method: 'POST',
		mode: 'cors'
	})
}