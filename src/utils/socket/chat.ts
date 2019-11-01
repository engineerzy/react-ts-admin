import io from 'socket.io-client'
const socketUrl = 'http://127.0.0.1:4000/'

class SocketServer {
	private socket
	constructor (baseUrl: string = socketUrl, opts = {}) {
		this.socket = io.connect(baseUrl, {
			query: {auth: window.sessionStorage.getItem('Auth')}
		})
	}
	
	on <T>(eventName: string, cb: (...args: any[]) => T | void, context?: any, ) {
		this.socket.on(eventName, (data: any) => {
			typeof cb === 'function' &&cb.call(context, data)
		})
	}

	emit <T>(eventName: string, msg: string, cb?: (...args: any[]) => T | void, context?: any) {
		this.socket.emit(eventName, msg)
	}

	close () {
		this.socket.close()
	}

}
export default SocketServer





