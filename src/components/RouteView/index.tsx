import React from 'react'
import { Switch, withRouter, RouteComponentProps} from 'react-router-dom'
import { RouteProps } from 'routes/types'
import SetSite from 'components/SetSite'  

interface RouteViewProps extends RouteComponentProps {
	routes: Array<RouteProps>
}

const RouteView: React.FC<RouteViewProps> = props => {

	return (
		<>
			{
				(props.routes && props.routes.length) ? <Switch>
					{
						props.routes.map((route, index) => <SetSite {...route} key={index}></SetSite>)
					}
				</Switch> : null
			}
		</>

	)
}

export default withRouter(RouteView)