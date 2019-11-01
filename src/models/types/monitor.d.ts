import { ColumnProps } from 'antd/es/table';

export type NumberType = number | undefined | null

export type TopChartItemType = {
	date: string,
	value: NumberType
}
export type TopChartState = {
	salesVolume: {
		totalAmount: NumberType,
		increasePercent: NumberType,
		reducePercent: NumberType,
		currentAmount: NumberType,
	},
	trafficVolume: {
		totalAmountList: Array<{ TopChartItemType }>
		increasePercentList: Array<{ TopChartItemType }>
		reducePercentList: Array<{ TopChartItemType }>
		currentAmountList: Array<{ TopChartItemType }>
	}
}
export interface MonitorInterface {
	topChartState: TopChartState
	tableColumns: ColumnProps
	tableData: Array<{
		name: string,
		age: number,
		sex: boolean,
		isSingle: boolean,
		singleWay: string,
		marryPlan: string,
		mark: string
	}>

	getTopChartData: (params?: any) => any
	getMonitorTableData: (params?: any) => any | void
}
