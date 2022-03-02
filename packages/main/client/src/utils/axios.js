import axios from 'axios';
import { getCookieParams } from './cookie';

// axios.defaults.withCredentials = true;
// 新建了一个axios的实例
const ajax = axios.create({
	headers: {
		'x-token': getCookieParams('xToken'),
	},
});

// http request 拦截器
axios.interceptors.request.use(
	(config) => {
		// const token = sessionStorage.getItem('token');
		// if (token) {
		// 	config.headers.authorization = token;
		// }
		return config;
	},
	(err) => {
		return Promise.reject(err);
	},
);

// http response 拦截器
ajax.interceptors.response.use(
	(response) => {
		if (!response?.data?.success) throw new Error(response?.data?.message);
		// 全局处理响应情况
		return response;
	},
	(err) => {
		// 还可以判断其他的响应失败情况
		return Promise.reject(err);
	},
);

export default ajax;
