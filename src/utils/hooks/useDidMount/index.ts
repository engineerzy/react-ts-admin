import { useEffect } from 'react'
const useDidMount = (fn: (...args: any[]) => void): void => {
	useEffect(() => {
		fn()
	}, [])
}

export default useDidMount