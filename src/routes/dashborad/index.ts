import Dashborad from 'pages/Dashborad'
import Analysis from 'pages/Dashborad/analysis'
import Monitor from 'pages/Dashborad/monitor'
import { RouteProps } from '../types'

const defaultRoutes: Array<RouteProps> = [
	{
		path: '/',
		component: Dashborad,
		exact: true,
		title: 'dashborad'
	},
	{
		path: '/dashborad',
		component: Dashborad,
		title: 'dashborad'
	}
]

const routes: Array<RouteProps> = [
	{
		path: '/dashborad/analysis',
		component: Analysis,
		title: '分析页'
	},
	{
		path: '/dashborad/monitor',
		component: Monitor,
		title: '监控页'
	}
]

export { defaultRoutes, routes }
