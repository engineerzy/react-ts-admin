import request from '../service/request'

export const getSubMenu = () => {
	return request('subMenu', {
		method: 'GET'
	})
}