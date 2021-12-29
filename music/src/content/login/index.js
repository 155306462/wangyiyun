import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionCreators } from '../../content/login/store';
import { LoginWapper } from './style';
import { Form, Input, Button, Checkbox } from 'antd'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class Login extends PureComponent {
	state ={account:'',password:''}
	 onFinish = (values) => {
		console.log('Success:', values);
	  };
	
     onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	handleAccount = (event)=>{
		if(event && event.target && event.target.value){
		  let value = event.target.value;
		  this.setState(()=>({account:value }))
		}
	  }
	handlePassword = (event)=>{
		if(event && event.target && event.target.value){
		  let value = event.target.value;
		  this.setState(()=>({password:value }))
		}
	}
	render() {
		const { tologin, loginstatus } = this.props;
		if (!loginstatus) {
			return (
				<Fragment>
					<LoginWapper>
					<Form {...layout} name="login"
					initialValues={{remember:true,}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					autoComplete='off'
					>
					   <Form.Item
					   label="手机号"
					   name="account"
					   rules={[
						   {
							   required:true,
							   message:'请输入手机号'
						   },
					   ]}>
						  <Input onChange ={event => this.handleAccount(event)} />
						   
					   </Form.Item>
					   <Form.Item
					   label="密码"
					   type="password"
					   name="password"
					   rules={[
						   {
							   required:true,
							   message:'请输入密码'
						   },
					   ]}>
						    <Input.Password onChange ={event => this.handlePassword(event)} />
					   </Form.Item>
					   <Form.Item
					   name="remember"
					   valuePropName='checked'
					   wrapperCol={{
						   offset:8,
						   span:16,
					   }}>
						   <Checkbox>记住密码</Checkbox>
                        </Form.Item>
						<Form.Item {...tailLayout}>
		             
						<Button onClick={()=>tologin(this.state.account,this.state.password)} type="primary" style={{ background: "#dd001b", borderColor: "#dd001b" }}>
							登录
						</Button>
						</Form.Item>
				
					</Form>
					</LoginWapper>	
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Redirect to='/individuation' />;
				</Fragment>
			);
		}
	}
}
export const MapStateToProps = (state) => {
	return {
		loginstatus: state.getIn(['login', 'login']),
	};
};
export const MapDispatchToProps = (dispatch) => {
	return {
		tologin(accountElem, passwordElem) {
			dispatch(actionCreators.login(accountElem, passwordElem));
		},
	};

};
export default connect(MapStateToProps, MapDispatchToProps)(Login);
