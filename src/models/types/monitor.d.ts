import { ColumnProps } from 'antd/es/table';

export type NumberType = number | undefined | null

export type TopChartItemType = {
	date: string,
	value: NumberType
}

interface MonitorInterface {
	topChartState: {
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

	getTopChartData: (params?: any) => void
	getMonitorTableData: (params?: any) => any | void
}

export { MonitorInterface }