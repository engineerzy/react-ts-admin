import React from 'react'
import { Icon, Tooltip } from 'antd'
import './index.scss'

interface TopChartProps {
	children?: React.ReactNode,
	title: string,
	amount: number | undefined | null,
	footInfo?: string,
	tipText?: string,
	isSymbol?: boolean
}

const TopChart: React.FC<TopChartProps> = props => {
	return (
		<div className="top-chart-item">
			<div className="top-chart-title">
				<span>{ props.title }</span>
				<Tooltip placement="topRight" title={props.tipText}>
					<i>
						<Icon type="exclamation"></Icon>
					</i>
					
				</Tooltip>
			</div>
			<div className="top-chart-amount">
				{props.isSymbol ? '¥' : ''} { props.amount }
			</div>
			<div className="top-chart-extra">
				{ props.children }
			</div>
			<div className="top-chart-foot">
				{ props.footInfo }
			</div>
		</div>
	)
}
TopChart.defaultProps = {
	title: '标题',
	amount: 0,
	footInfo: '',
	tipText: '暂无提示',
	isSymbol: false
}

export default TopChart