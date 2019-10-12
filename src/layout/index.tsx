import React, { useState, useMemo, useRef } from 'react'
import { useAsyncEffect } from 'utils/hooks'
import routes from 'routes'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import LayoutHeader from './AppHeader'
import LayoutSliderBar from './AppSliderBar'
import { LayoutStateTypes } from './types.interface'
import RouteView from 'components/RouteView'
import * as api from 'api'
import './index.scss'

const useLayout = () => {
	let count = useRef(0)
	count.current++
	const [state, setState] = useState<LayoutStateTypes>({ avatar: '', nickname: '', menus: [] })
	const {loading} = useAsyncEffect(async () => {
		const [menusInfo, userInfo] = await Promise.all([api.layout.getSubMenu(), api.user.getUserInfo()])
		setState(s => ({
			nickname: userInfo.data.nickname,
			avatar: userInfo.data.avatar,
			menus: menusInfo.data.menus
		}))
	}, [])
	console.log(`第${count.current}次渲染`, loading)
	return { menus: state.menus, user: { nickname: state.nickname, avatar: state.avatar } }
}


const RouteContent: React.FC<{ pathname: string }> = ({ pathname }) => {
	return (
		<section className="layout-main">
			<RouteView routes={routes}></RouteView>
		</section>
	)
}

const Layout: React.FC<RouteComponentProps> = (props) => {
	const { menus, user } = useLayout()
	function test(a: number) {
		if(a == 5) {
			// "plugins": [
			// 	"react-hook"
			// ],
		// 	"no-unused-vars": ["off"],
		// "exhaustive-deps": ["off"],
		}
	}
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
						<RouteContent
							pathname={props.location.pathname}
						/>,
						[props.location.pathname]
					)
				}
			</div>
		</div>
	)
}

export default withRouter(Layout)