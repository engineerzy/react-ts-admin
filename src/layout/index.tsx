import React, { useState, useMemo, useRef } from 'react'
import { useAsyncEffect, } from 'utils/hooks'
import { IUser } from 'models/types'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import LayoutHeader from './AppHeader'
import LayoutSliderBar from './AppSliderBar'
import { LayoutStateTypes } from './types.interface'
import { observer, inject } from 'mobx-react'
import RouteView from 'components/RouteView'
import routes from 'routes'
import * as api from 'api'
import './index.scss'

const useLayout = (User: IUser.IUser) => {
	let count = useRef(0)
	count.current++
	const [state, setState] = useState<LayoutStateTypes>({ 
		avatar: '', 
		nickname: '', 
		menus: [] 
	})

	useAsyncEffect(async () => {
		const [menusInfo, userInfo] = await Promise.all([
			api.layout.getSubMenu(),
			api.user.getUserInfo()
		])

		setState(() => ({
			nickname: userInfo.data.nickname,
			avatar: userInfo.data.avatar,
			menus: menusInfo.data.menus
		}))
	}, [])

	User.changeUserInfo({
		nickname: state.nickname,
		avatar: state.avatar
	})

	return {
		menus: state.menus,
		user: {
			nickname: state.nickname,
			avatar: state.avatar
		}
	}
}


const RouteContent: React.FC = () => {
	return (
		<section className="layout-main">
			<RouteView routes={routes}></RouteView>
		</section>
	)
}

interface ILayout extends RouteComponentProps {
	User?: IUser.IUser
}
const Layout: React.FC<ILayout> = observer(props => {
	const { menus, user } = useLayout(props.User)
	return (
		<div className="layout-page clearfix">
			<LayoutSliderBar
				subMenus={menus}
			/>
			<div className="layout-content">
				<LayoutHeader
					avatar={user.avatar}
					nickname={user.nickname}
				/>

				{
					useMemo(() =>
						<RouteContent />,
						[]
					)
				}
			</div>
		</div>
	)
})

export default withRouter<ILayout, React.FC<ILayout>>(inject('User')(Layout))