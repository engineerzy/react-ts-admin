import React, { useEffect } from 'react';
import './App.css';
import { Button } from 'antd'
import { startLogin } from './api/login'
import { getSubMenu } from './api'
const App: React.FC = () => {
	useEffect(() => {
		startLogin({}).then(res=> {
			console.log(res)
		})
		getSubMenu().then(res => {
			console.log(res)
		})
	})
	return (
		<div className="App">
			<Button>hha</Button>
		</div>
	);
}

export default App;
