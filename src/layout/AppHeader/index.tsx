import React, { useState, useMemo, useCallback } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd'
import Avatar from './Avatar'
import './index.scss'

interface IProps extends RouteComponentProps {
	avatar: string,
	nickname: string
}

const Header: React.FC<IProps> = props => {
	const { avatar, nickname } = props
	const [leftBtnIcon, setLeftBtnIcon] = useState('menu-fold')
	function handleLogout() {
		window.sessionStorage.removeItem('Auth')
		props.history.push('/login')
	}

	function changeLeftBtnIconStatus() {
		const newLeftBtnIcon = leftBtnIcon === 'menu-fold' ? 'menu-unfold' : 'menu-fold'
		setLeftBtnIcon(newLeftBtnIcon)
	}
	return (
		<section className="layout-header">
			<div className="layout-header-expand" onClick={changeLeftBtnIconStatus}>
				<Icon type={leftBtnIcon} />
			</div>
			<div>
				{
					useCallback(() => <Avatar
						username={nickname}
						avatarUrl={avatar}
						onLogout={handleLogout}
					/>, [nickname, avatar])()
				}
			</div>
		</section>
	)
}

export default withRouter<IProps, React.FC<IProps>>(Header)