import { useEffect, useState, useCallback, useRef } from 'react'

export interface StateType<T> {
	loading: boolean,
	data?: T,
	error?: Error,
	run?: () => Promise<T | undefined>
}

export default function useAsyncEffect<Result = any>(
	effect: (...args: any[]) => Promise<Result>,
	input: ReadonlyArray<any>
) {
	const [state, setState] = useState<StateType<Result>>({
		loading: false,
		run: async () => null as any
	})
	const loading = useRef(false)

	const run = useCallback((...args: any[]): Promise<any | undefined> => {
		loading.current = true
		return effect(...args)
			.then(data => {
				loading.current = false
				setState(s => ({ ...s, data, loading: false }))
				return data
			})
			.catch(error => {
				loading.current = false
				setState(s => ({ ...s, error, loading: false }))
				return error
			})
	}, input)

	useEffect((...args: any[]) => {
		run(...args)
	}, input)

	return {
		loading: loading.current,
		data: state.data ? state.data : {},
		run,
	}
}