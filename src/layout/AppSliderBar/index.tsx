import React, { useState } from 'react'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

type IMenuItem = {
	title: string,
	key: string,
	path: string,
	children: Array<IMenuItem>
}

interface IProps extends React.FC {
	subMenus: Array<IMenuItem>,
	openMenu: IMenuItem,
	activeMenu: IMenuItem,
}

const SliderBar: React.FC<IProps> = (props) => {
	const { subMenus, openMenu, activeMenu } = props

	return (
		<Menu mode="inline"
			openKeys={[openMenu.key]}
			defaultSelectedKeys={[activeMenu.key]}>
			{
				subMenus.map(sub => {
					if (sub.children) {
						return (
							<SubMenu>
								{
									sub.children.length && sub.children.map(item =>
										<Menu.Item key={item.key}>
											<span>
												<Icon type="appstore"></Icon>
												<span>{item.title}</span>
											</span>
										</Menu.Item>
									)
								}
							</SubMenu>
						)
					} else {
						<Menu.Item key={sub.key}>
							<span>
								<Icon type="appstore"></Icon>
								<span>{sub.title}</span>
							</span>
						</Menu.Item>
					}
				})
			}
		</Menu>
	)
}

export default SliderBar