import { defaultRoutes as Dashborad } from './dashborad'
import { defaultRoute as Form } from './form'
import Monitor from './monitor'
import Other from './other'

export default [
	...Dashborad,
	...Monitor,
	...Form,
	...Other
]