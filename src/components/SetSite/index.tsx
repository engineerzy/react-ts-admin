import React from 'react'
import { RouteProps } from 'routes/types'
import { Route } from 'react-router-dom'

interface SetSiteProps extends RouteProps {
	key?: number | string,
}
interface UseWebTitleProps {
	<T>(title?: string): T | void
}

const useWebTitle:UseWebTitleProps = (title) => {
	title && ( document.title = title)
}

const SetSite: React.FC<SetSiteProps> = props => {
	useWebTitle(props.title)
	return <Route {...props}></Route>
}

export default SetSite