import React, { useCallback, FormEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useAsyncEffect } from 'utils/hooks'
import { observer, inject } from 'mobx-react'
import { routes } from 'routes/dashborad'
import RouteView from 'components/RouteView'
import { toJS } from 'mobx'
import { Button, Table, Form, Input, Select, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/es/form';
import TopChart from 'components/TopChart'
import { IDashborad, IStores } from 'models/types'
import './index.scss';

interface IProps extends RouteComponentProps, FormComponentProps {
	Store: IDashborad.DashboradInterface
}

const useTopCharts = (charts: IDashborad.IChart[], data: IDashborad.TopChartState): JSX.Element[] => {
	const MemoTopChart = useCallback((chart: IDashborad.IChart, key: number) => <TopChart
		{...chart}
		key={key}
		amount={data.salesVolume[chart.amountField]}>
		<div id={chart.el}></div>
	</TopChart>, [data])

	return charts.map((chart, index) => MemoTopChart(chart, index))
}

const useGetChartData = (Store: IDashborad.DashboradInterface, params?: object) => {
	return useAsyncEffect(async () => {
		await Store.getTopChartData(params)
	}, [params]);
}

const useGetTableData = (Store: IDashborad.DashboradInterface, params?: any) => {
	return useAsyncEffect(async () => {
		Store.getMonitorTableData(params)
	}, [params]);
}

const useSubmit = (form) => {
	const handleSubmit = useCallback((e: FormEvent) => {
		e.preventDefault()
		form.validateFields((err, values) => {
			if(err) return;
			// todo somethings
		})
	}, [form])
	return handleSubmit
}

// 中文名称校验
const ValidateCname = (rule, value: string, cb) => {
	if (!value || !value.trim()) {
		cb()
	} else if (value && !/^[\u4e00-\u9fa5]{2,6}$/.test(value)) {
		cb(new Error('请输入正确的中文名称'))
	} else {
		cb()
	}
}
const Dashborad: React.FC<IProps> = observer(props => {
	const { Store, form } = props
	const { getFieldDecorator } = form
	useGetChartData(Store)
	useGetTableData(Store)
	const handleSubmit = useSubmit(props.form)
	const MemoTopCharts = useTopCharts(Store.topChartInfo, Store.topChartState)

	return (
		<div className="fx-page-dashborad">
			<div className="dashborad-top">
				{MemoTopCharts}
			</div>
			<div className="monitor-page-table">
				<Form layout="inline" className="monitor-page-table-search" onSubmit={handleSubmit}>
					<Row gutter={24}>
						<Col span={8}>
							<Form.Item label="姓名" labelCol={{span: 8}} wrapperCol={{span: 16}} >
								{
									getFieldDecorator('name', {
										rules: [
											{ validator: ValidateCname }
										]
									})(<Input />)
								}

							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="是否已有对象" labelCol={{span: 10}} wrapperCol={{span: 14}}>
								{
									getFieldDecorator('isLove')(<Select>
										<Select.Option value="1">
											是
										</Select.Option>
										<Select.Option value="0">
											否
										</Select.Option>
									</Select>)
								}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item>
								<Button type="primary" htmlType="submit">查询</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				<Table
					size="small"
					columns={Store.tableColumns}
					dataSource={toJS(Store.tableData)}
					rowKey={(record, index) => record.name + index}
				/>
			</div>
			<div>
				<RouteView routes={routes} />
			</div>
		</div>
	)
})

export default withRouter(inject(
	(stores: IStores) => ({ Store: stores.Dashborad })
)(Form.create<IProps>()(Dashborad)))