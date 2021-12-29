import axios from 'axios';
import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import {actionCreators as NavactionCreators} from '../../nav/store'
import { message, Button, Space } from 'antd';

export const ChangeLogin = (data) => ({
	type: actionTypes.CHANGE_LOGIN,
	data: fromJS(data),
});

export const login = (account, password) => {
	return (dispatch) => {
		axios
			.post(
				`http://localhost:3000/login/cellphone?phone=${account}&password=${password}&t=${new Date().getTime()}`,
				{}
			)
			.then(function (res, value) {
				const data = res.data;
				// console.log(data);
				if (data.code === 200) {
					message.success('登陆成功ψ(｀∇´)ψ');
					localStorage.setItem('login', `${JSON.stringify(data)}`);
					dispatch(ChangeLogin(data, value));
					dispatch(NavactionCreators.loginstatus());
				} else {
					message.success('登陆失败QAQ');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

export const Logout = () => {
	return () => {
		axios
			.post('http://localhost:3000/logout')
			.then(function (res) {
				const data = res.data;
				if (data.code === 200) {
					message.success('退出登录(≧∇≦)ﾉ');
					// eslint-disable-next-line no-restricted-globals
					history.go(0);
				}
			})
			.catch(function () {
				console.log('Logout failed');
			});
	};
};

export const LogOut = () => ({
	type: actionTypes.LOG_OUT,
});

export const localstorage = () => ({
	type: actionTypes.LOCAL_STORAGE,
});
