import React, { useEffect, useState, useRef, useCallback } from 'react'
import io from 'socket.io-client'
import { IUser } from 'models/types'
import { observer, inject } from 'mobx-react'
import { Form, Input, Button, message as Message } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import './index.scss'

interface IMsg {
	msg: string,
	user: string
}

interface MessageItemProps {
	currentUser: IUser.IUser,
	msg?: IMsg
}

interface BasicFormProps extends RouteComponentProps {
	User: IUser.IUser
}
interface IEmit {
	<T>(eventName: string, msg: any): T | void
}
interface ISetValue {
	(s: string): void
}
interface ScrollMutable {
	msgContentEl: React.MutableRefObject<HTMLDivElement>,
	msgWrapperEl: React.MutableRefObject<HTMLDivElement>
}

const MessageItem: React.FC<MessageItemProps> = ({ msg, currentUser }) => {
	const isCurrent = msg.user === 'admin'
	// const isCurrent = msg.user === currentUser.userInfo.nickname÷
	const classes = `msg-item clearfix${isCurrent ? ' user-item' : ''}`
	return (
		<div className={classes}>
			<div className="msg-user">
				{msg.user}
			</div>
			<div className="msg-text">
				{msg.msg}
			</div>
		</div>
	)
}

const useKeyUp = (fn: () => void): void => {
	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		e.keyCode === 13 && fn()
	}, [fn])

	useEffect(() => {
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [handleKeyUp])
}

const useSocketMsg = (): { msgs: any[], emit: IEmit } => {
	const [msgs, setMsgs] = useState<any[]>([])
	const Socket = useRef(null)
	useEffect(() => {
		Socket.current = io.connect({
			enablesXDR: false,
		})
		Socket.current.on('chat message', function (msg) {
			setMsgs(s => [...s, msg])
		})
		Socket.current.on('chat connect', () => {
			Message.success('连接成功')
		})
		Socket.current.on('chat loading', msg => {
			Message.warning(msg.msg)
		});

		return () => {
			Socket.current.disconnect()
		}
	}, [])

	const emit: IEmit = (eventName, msg) => {
		Socket.current.emit(eventName, msg)
	}
	return { msgs, emit }
}

const useEmitMsg = (value: string, emit: IEmit, setValue: ISetValue) => {
	return useCallback(() => {
		if (!value || !value.trim()) return;
		emit<string>('chat message', value)
		setValue('')
	}, [value, emit])
}

const useMsgElSrcoll = (msgs: IMsg[]): ScrollMutable => {
	const msgContentEl = useRef<HTMLDivElement>(null)
	const msgWrapperEl = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (msgContentEl.current && msgWrapperEl.current) {
			const parent = msgWrapperEl.current.getBoundingClientRect()
			const son = msgContentEl.current.getBoundingClientRect()
			if (son.height - parent.height > 10) {
				msgWrapperEl.current.scrollTo({
					top: son.height - parent.bottom + 120,
					behavior: 'smooth'
				})
			}
		}
	}, [msgs]);

	return { msgContentEl, msgWrapperEl }
}

const BasicForm: React.FC<BasicFormProps> = observer(props => {
	const [value, setValue] = useState<string>('')
	const { msgs, emit } = useSocketMsg()
	const sendMsg = useEmitMsg(value, emit, setValue)
	const { msgContentEl, msgWrapperEl } = useMsgElSrcoll(msgs)
	useKeyUp(sendMsg)

	return (
		<div>
			<div className="room-wrapper">
				<div className="msg-wrapper" ref={msgWrapperEl}>
					<div className="msg-content" ref={msgContentEl}>
						{
							msgs.map((msg, key) => <MessageItem
									msg={msg}
									key={key}
									currentUser={props.User}
							/>)
						}
					</div>
				</div>
				<div className="input-wrapper">
					<Form layout="inline">
						<Form.Item >
							<Input
								value={value}
								onChange={(e) => setValue(e.currentTarget.value)}
							/>
						</Form.Item>
						<Form.Item>
							<Button onClick={sendMsg} type="primary">发送</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
})

export default inject('User')(BasicForm)