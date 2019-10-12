import { observable } from 'mobx'

class Chart {
	@observable state = {
		cc: 'hello world'
	}
}

export default new Chart()