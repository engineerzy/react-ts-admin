export type IString = string | undefined | null

export type UserInfo = {
	nickname: IString,
	avatar: IString 
}
export interface IUser {
	userInfo: UserInfo
	changeUserInfo(data: UserInfo): void
}