import React from 'react'
import { Menu, Dropdown } from 'antd'
import './index.scss'
const { Item } = Menu

interface AvatarProps {
	avatarUrl: string,
	username: string,
	onLogout?: () => void | Promise<any>
}

const Avatar: React.FC<AvatarProps> = props => {
	function handleItemClick () {
		props.onLogout && props.onLogout()
	}
	const menus = (
		<Menu>
			<Item onClick={handleItemClick}>
				<span>退出登陆</span>
			</Item>
		</Menu>
	)
	return (
		<div className="layout-header-avatar">
			<img src={props.avatarUrl} alt="user" className="avatar-img" />
			<Dropdown overlay={menus}>
				<span>{props.username}</span>
			</Dropdown>
		</div>
	)
}

export default Avatar

