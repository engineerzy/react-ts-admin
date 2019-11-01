import * as IMonitor from './monitor'
import * as IUser from './user'
import * as IDashborad from './dashborad'
export interface IStores {
	Monitor: IMonitor,
	User: IUser,
	Dashborad: IDashborad
}
export { IMonitor, IUser, IDashborad }