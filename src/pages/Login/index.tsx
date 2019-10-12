import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Icon, Input, Button, message as Message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { Store } from './interface'
import * as api from 'api'
import './index.scss'

interface IProps {
	Login: Store,
	[propName: string]: any
}
const Login: React.FC<IProps & FormComponentProps> = observer(props => {
	const { getFieldDecorator, validateFields } = props.form
	const [loading, setLoading] = useState(false)
	function startLogin() {
		setLoading(true)
		validateFields(async (errors, values) => {
			if (errors) {
				Message.warning('请检查用户信息是否填写正确')
			} else {
				setLoading(true)
				const { data: { Auth } } = await api.login.startLogin(values)
				window.sessionStorage.setItem('Auth', Auth)
				setLoading(false)
				props.history.push('/dashborad')
			}
		})
	}
	return (
		<div className="login-layout-wrapper">
			<div className="login-layout-content">
				<div className="login-layout-top">
					{/* <img src={LogoPng} alt="logo" /> */}
					<h5>期待科技登陆门户</h5>
					<p>Ant Design 是西湖区最具影响力的 Web 设计规范</p>
				</div>
				<div className="login-layout-form">
					<Form layout="horizontal">
						<Form.Item >
							{
								getFieldDecorator('username', {
									rules: [
										{
											required: true,
											message: '账号不能为空'
										}
									]
								})(<Input
									size="large"
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="请输入账号" />)
							}
						</Form.Item>
						<Form.Item>
							{
								getFieldDecorator('password', {
									rules: [
										{
											required: true,
											message: '密码不能为空'
										}
									]
								})(<Input
									size="large"
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="请输入密码" />)
							}
						</Form.Item>
						<Form.Item>
							<Button type="primary"
								size="large"
								loading={loading}
								onClick={startLogin}
								block>
								登陆
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
})
export default Form.create({ name: 'login' })(inject('Login')(Login))
