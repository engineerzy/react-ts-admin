import request from '../service/request'

export const getSubMenu = () => {
	return request('http://localhost:4000/subMenu', {
		method: 'GET'
	})
}