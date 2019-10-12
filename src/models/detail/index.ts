import { observable } from 'mobx'

class Detail {
	@observable state = {
		a: 111
	}
}

export default new Detail()