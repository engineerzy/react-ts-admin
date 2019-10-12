import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import LogoImg from 'assets/img/logo.png'
import './index.scss'
const { SubMenu } = Menu

type IMenuItem = {
	title: string,
	key: string,
	path: string,
	parent: string | null,
	children?: Array<IMenuItem>
}

interface IProps extends RouteComponentProps {
	subMenus: Array<IMenuItem>,
}

const getDefaultOpen = (currentMenu: IMenuItem): IMenuItem => {
	return currentMenu.children && currentMenu.children.length
		? getDefaultOpen(currentMenu.children[0]) : currentMenu
}
function setOpenMenu(pathname: string, subMenus: Array<IMenuItem>): IMenuItem {
	function flat(menus: Array<IMenuItem>): Array<IMenuItem> {
		return menus.reduce((pre: Array<IMenuItem>, cur) => pre.concat((cur.children && cur.children.length) ? flat(cur.children) : cur), [])
	}
	const allMenus = flat(subMenus).filter(menu => !Reflect.has(menu, 'children'))
	return allMenus.find(menu => pathname.indexOf(menu.path) !== -1) || getDefaultOpen(subMenus[0])
}

const useMenus = (subMenus: Array<IMenuItem>, currentPath: string) => {
	const [openConfig, setOpenConfig] = useState({
		openMenu: [] as Array<string>,
		activeMenu: [] as Array<string>
	})
	
	useEffect(() => {
		if (!subMenus.length) return;
		const defaultOpen = setOpenMenu(currentPath, subMenus)
		setOpenConfig({
			openMenu: [(defaultOpen.parent as string)],
			activeMenu: [defaultOpen.key]
		})
	}, [subMenus, currentPath])

	return { openConfig, setOpenConfig }
}

const SliderBar: React.FC<IProps> = (props) => {
	const { subMenus } = props
	const { openConfig, setOpenConfig } = useMenus(subMenus, props.location.pathname)

	// 更改展开项
	function openChangeHandle(openKeys: Array<string>): void {
		setOpenConfig({
			openMenu: openKeys,
			activeMenu: openConfig.activeMenu
		})
	}

	// 选中项更改
	function selectChangeHandle(item: { key: string }) {
		setOpenConfig({
			openMenu: openConfig.openMenu,
			activeMenu: [item.key]
		})
	}

	return (
		<aside className="sliderbar-section">
			<div className="sliderbar-logo">
				<img src={LogoImg} alt="logo" />
			</div>
			<Menu mode="inline"
				theme="dark"
				openKeys={openConfig.openMenu}
				selectedKeys={openConfig.activeMenu}
				style={{ width: '256px', height: '100%', float: 'left' }}
				onOpenChange={openChangeHandle}
				onSelect={selectChangeHandle}
			>
				{
					subMenus.map(sub => {
						if (sub.children) {
							return (
								<SubMenu key={sub.key} title={sub.title}>
									{
										sub.children.map(item =>
											(<Menu.Item key={item.key} >
												<Link to={item.path}>
													<Icon type="appstore"></Icon>
													<span>{item.title}</span>
												</Link>
											</Menu.Item>)
										)
									}
								</SubMenu>
							)
						} else {
							return (
								<Menu.Item key={sub.key}>
									<span>
										<Icon type="appstore"></Icon>
										<span>{sub.title}</span>
									</span>
								</Menu.Item>
							)
						}
					})
				}
			</Menu>
		</aside>
	)
}

export default withRouter<IProps, React.FC<IProps>>(SliderBar)