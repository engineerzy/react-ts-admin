export interface IMenuItem {
	title: string,
	key: string,
	path: string,
	parent: string | null,
	children?: Array<IMenuItem>
}

export interface LayoutStateTypes {
	avatar: string,
	nickname: string
	menus: Array<IMenuItem>
}