import { RouteProps } from 'react-router-dom'

interface CustomRouteProps extends RouteProps {
	title?: string,
	redirect?: string,
	routes?: Array<CustomRouteProps>
}

export { CustomRouteProps as RouteProps }