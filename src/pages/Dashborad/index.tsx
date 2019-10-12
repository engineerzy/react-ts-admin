import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Store } from './interface'
import { observer, inject } from 'mobx-react'
import { routes } from 'routes/dashborad'
import RouteView from 'components/RouteView'
import { action } from 'mobx'
import { Button } from 'antd'
// import * as api from 'api'
import './index.scss';

interface IProps extends RouteComponentProps {
	Dashborad: Store
}

const Dashborad: React.FC<IProps> = observer( props => {
	let { Dashborad, history } = props
	function changeState() {
		history.push('/dashborad/analysis/56', {name: 'zs'})
	}
	return (
		<div className="fx-page-dashborad">
			你好
			{Dashborad.state.a}
			<Button onClick={action('a', changeState)}>点击</Button>
			<div>
				<RouteView routes={routes} />
			</div>
		</div>
	)
})

export default withRouter<IProps, React.FC<IProps>>(inject((stores: any) => ({
	Dashborad: stores.Dashborad
}))(Dashborad))