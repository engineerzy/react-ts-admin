import React from 'react'
import Layout from 'layout'
import { Redirect } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const Auth: React.FC<RouteComponentProps> = () => {
	return window.sessionStorage.getItem('Auth') ? <Layout /> : <Redirect to="/login" />
}

export default withRouter(Auth)