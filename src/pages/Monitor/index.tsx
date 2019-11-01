import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import TopChart from 'components/TopChart'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IMonitor } from 'models/types'
import { Table } from 'antd'
import './index.scss'

function useAsync (fn: () => Promise<any>, devs: Array<any>): void
function useAsync (fn: () => void, devs: Array<any>): void
function useAsync (fn, devs: any[]) {
	useEffect(() => {
		fn()
	}, devs)
}

interface MonitorProps extends RouteComponentProps {
	Monitor: IMonitor.MonitorInterface
}

const Monitor: React.FC<MonitorProps> = inject('Monitor')(observer(props => {
	const { Monitor } = props
	const { topChartState: { salesVolume } } = Monitor
	useAsync(async () => {
		await Promise.all([Monitor.getTopChartData(), Monitor.getMonitorTableData()])
	}, [])
	return (
		<>
			<div className="monitor-page-top">
				<TopChart
					title="总销售额"
					amount={salesVolume.totalAmount}
					footInfo="日销售额: 534"
					tipText="随便写点啥吧">
					<p><span>周同比  12%</span>&nbsp;&nbsp;&nbsp;<span>日同比  11%</span></p>
				</TopChart>
				<TopChart
					title="访问量"
					amount={salesVolume.currentAmount}
					footInfo="访问量: 65"
					tipText="随便写点啥吧">
					<div id="top1"></div>
				</TopChart>
				<TopChart
					title="支付笔数"
					amount={salesVolume.reducePercent}
					footInfo="转化率: 42%"
					tipText="随便写点啥吧">
					<div id="top2"></div>
				</TopChart>
				<TopChart
					title="运营活动效果"
					amount={salesVolume.increasePercent}
					footInfo="日销售额: 432"
					tipText="随便写点啥吧">
					<div id="top3"></div>
				</TopChart>
			</div>
			<div className="monitor-page-table">
				<Table 
					size="middle"
					columns={Monitor.tableColumns} 
					dataSource={toJS(Monitor.tableData)} 
					rowKey={(record, index) => record.name + index}
				/>
			</div>
		</>
	)
}))

export default withRouter<MonitorProps, React.FC<MonitorProps>>(Monitor)