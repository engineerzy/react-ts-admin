import request from 'service/request'

export const getMonitorTableData = () => request('monitor/getMonitorTableData', {
	method: 'POST',
	
})
