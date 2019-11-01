
import React from 'react'
import { IMonitor } from 'models/types'
import { Button } from 'antd'
import Chart from 'utils/chart'
import { observable, action, configure, runInAction, toJS } from 'mobx'
import * as api from 'api'
configure({ enforceActions: 'observed' })

class Monitor implements IMonitor.MonitorInterface {
	@observable topChartState = {
		salesVolume: {
			totalAmount: 0,
			increasePercent: 0,
			reducePercent: 0,
			currentAmount: 0,
		},
		trafficVolume: {
			totalAmountList: [],
			increasePercentList: [],
			reducePercentList: [],
			currentAmountList: []
		}
	}

	@observable tableColumns = [
		{
			title: '姓名',
			key: 'name',
			dataIndex: 'name',
			align: 'center'
		},
		{
			title: '性别',
			key: 'sex',
			dataIndex: 'sex',
			align: 'center',
			render: text => <Button type="primary">{ text === false ? '女' : '男' }</Button>
		},
		{
			title: '年龄',
			key: 'age',
			align: 'center',
			dataIndex: 'age'
		},
		{
			title: '是否有对象',
			key: 'isSingle',
			dataIndex: 'isSingle',
			align: 'center',
			render: text => text === false ? '否' : '是'
		},
		{
			title: '怎么找到对象的',
			key: 'singleWay',
			dataIndex: 'singleWay',
			align: 'center'
		},
		{
			title: '结婚打算',
			key: 'marryPlan',
			dataIndex: 'marryPlan',
			align: 'center'
		},
		{
			title: '备注',
			key: 'mark',
			dataIndex: 'mark',
			align: 'center'
		}
	]
	@observable tableData = []

	@action.bound
	async getTopChartData(params) {
		const { data } = await api.chart.getTopChart()
		runInAction(() => {
			this.topChartState = data
			Chart.topChart1({
				container: 'top1',
				forceFit: true,
				height: 64,
				padding: ['20%', '0%']
			}, toJS(data.trafficVolume.totalAmountList))
			Chart.topChart2({
				container: 'top2',
				forceFit: true,
				padding: ['20%', '0%'],
				height: 64
			}, toJS(data.trafficVolume.increasePercentList))
			Chart.topChart3({
				container: 'top3',
				forceFit: true,
				height: 64,
				padding: ['20%', '0%']
			}, toJS(data.trafficVolume.reducePercentList))
		})
	}

	@action.bound
	async getMonitorTableData () {
		const { data } = await api.monitor.getMonitorTableData()
		runInAction(() => {
			this.tableData = data
		})
	}
}

export default new Monitor()
