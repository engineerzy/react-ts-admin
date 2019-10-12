
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Store } from './interface'
import { inject, observer } from 'mobx-react' 
import './index.scss'

interface IProps extends RouteComponentProps {
	Detail: Store
}
const Detail: React.FC<IProps> = inject('Detail')(observer(props => {
	return (<></>)
}))

export default withRouter<IProps, React.FC<IProps>>(Detail)
