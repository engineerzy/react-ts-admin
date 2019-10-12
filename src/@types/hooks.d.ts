
type DependencyList = ReadonlyArray<any>

interface EffectCallBack<T = {}> {
	(): (void | (() => void | undefined) | Promise<T>)
}
interface AsyncReturnValue<T> {
	loading?: boolean,
	data?: T,
	error?: Error,
	run?: <K>(...args: any[]) => Promise<K | undefined>
}
function useAsyncEffect <T = {}>(effect: EffectCallBack<T>, devs: DependencyList): AsyncReturnValue