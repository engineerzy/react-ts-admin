import request from 'service/request'

export const getUserInfo = () => {
	return request('http://localhost:4000/getUser', {
		method: 'POST'
	})
}