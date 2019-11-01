import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
// const AdminContext = React.createContext({name: '张三', age: 18})

interface ExampleProps {
	user: {
		name?: string,
		age?: number
	}
}
const Example = React.memo(function (props: ExampleProps) {
	return (
		<div>
			<span>{props.user.name }</span>
		</div>
	)
}, (prevProps, nextProps) => {
	return Object.keys(prevProps.user).every(key => {
		return prevProps.user[key] === nextProps.user[key]
	})
})


const Admin: React.FC = () => {
	const [user, setUser] = useState({name: '李四', age: 18})
	function handleClick() {
		setUser({
			...user,
			name: '张三'
		})
	}
	return (
		<>
			<button onClick={handleClick}>点我</button>
			管理员
			<Example user={user}></Example>
		</>
	)
}

export default withRouter(Admin)