import request from 'service/request'

export const getTopChart = () => request('dashborad/getTopChart', {
	method: 'POST'
})
