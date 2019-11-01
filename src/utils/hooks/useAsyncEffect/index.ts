/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback, useRef,DependencyList } from 'react'

export interface StateType<T> {
	loading: boolean,
	data?: T,
	error?: Error,
}

export default function useAsyncEffect<Result = any>(
	effect: (...args: any[]) => Promise<Result>,
	input: DependencyList = [],
	initState: StateType<Result> = {loading: false}
) {
	
	const [state, setState] = useState<StateType<Result>>(initState)
	
	const run = useCallback((...args: any[]): Promise<any | undefined> => {
		
		return effect(...args)
			.then(data => {
				setState(s => ({ ...s, data, loading: false }))
				return data
			})
			.catch(error => {
				setState(s => ({ ...s, error, loading: false }))
				return error
			})
	}, input)

	useEffect((...args: any[]) => {
		run(...args)
	}, input)

	return {
		data: state.data ? state.data : {},
		run,
	}
}