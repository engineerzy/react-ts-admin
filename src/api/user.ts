import request from 'service/request'

export const getUserInfo = () => {
	return request('getUser', {
		method: 'POST'
	})
}