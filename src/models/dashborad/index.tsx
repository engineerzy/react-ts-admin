import React from 'react'
import { Button } from 'antd'
import Chart from 'utils/chart'
import { observable, action, runInAction, configure, toJS } from 'mobx'
import * as api from 'api'
import { IDashborad } from 'models/types'
configure({ enforceActions: 'observed' })

class Dashborad {
	topChartInfo = [
		{
			title: '总销售额',
			tipText: '随便写点啥吧',
			amountField: 'totalAmount',
			footInfo: '日销售额',
			el: 'top1'
		},
		{
			title: '访问量',
			tipText: '随便写点啥吧',
			amountField: 'currentAmount',
			footInfo: '访问量',
			el: 'top2'
		},
		{
			title: '支付笔数',
			tipText: '随便写点啥吧',
			amountField: 'reducePercent',
			footInfo: '转化率',
			el: 'top3'
		},
		{
			title: '运营活动效果',
			tipText: '随便写点啥吧',
			amountField: 'increasePercent',
			footInfo: '日销售额',
			el: 'top4'
		}
	]
	formLayout = {
		labelCol: {
			xs: { span: 10 },
			sm: { span: 10 }
		},
		wrapperCol: {
			xs: { span: 14 },
			sm: { span: 14 }
		}
	}
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

	@observable tableData = []

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
			render: text => <Button type="primary">{text === false ? '女' : '男'}</Button>
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
		return data
	}

	@action.bound
	async getMonitorTableData() {
		const { data } = await api.monitor.getMonitorTableData()
		runInAction(() => {
			this.tableData = data
		})
	}

}

export default new Dashborad()