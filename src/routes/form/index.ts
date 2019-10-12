import Form from 'pages/Form'
import { RouteProps } from '../types'
import StepForm from 'pages/Form/step-form'
import BasicForm from 'pages/Form/basic-form'

const defaultRoute: Array<RouteProps> = [
	{
		path: '/form',
		component: Form,
		title: '表单'
	}
]

const routes: Array<RouteProps> = [
	{
		path: '/form/basic-form',
		component: BasicForm,
		title: '基础表单'
	},
	{
		path: '/form/step-form',
		component: StepForm,
		title: '分步表单'
	}
]
export { defaultRoute, routes }