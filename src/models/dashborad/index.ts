import { observable } from 'mobx'

class Dashborad {
	@observable state = {
		a: 111
	}
}

export default new Dashborad()