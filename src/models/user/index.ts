
import { observable, action } from 'mobx'
import { IUser } from 'models/types'

class User implements IUser.IUser {
	@observable userInfo = {
		nickname: '',
		avatar: ''
	}
	changeUserInfo (data) {
		this.userInfo = data
		return 'fefe'
	}
}

export default new User()