import Monitor from 'pages/Monitor'
import { RouteProps } from '../types'

const routes: Array<RouteProps> = [
	{
		path: '/monitor',
		component: Monitor,
		title: '监控页',
		exact: true,
	}
]

export default routes