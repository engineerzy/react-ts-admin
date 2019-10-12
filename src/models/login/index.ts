import { observable } from 'mobx'

class Login {
	@observable state = {
		username: '',
		password: ''
	}
}

export default new Login()