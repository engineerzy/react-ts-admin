import React from 'react';
import AuthPage from './pages/Auth'
import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router-dom'
import History from './utils/history'
import Login from 'pages/Login'
import * as Stores from 'models'
import 'assets/style/reset.scss'

const App: React.FC = () => {
	return (
		<Provider {...Stores}>
			<Router history={History}>
				<Route path="/login" component={Login} />
				<AuthPage />
			</Router>
		</Provider>
	);
}

export default App;
