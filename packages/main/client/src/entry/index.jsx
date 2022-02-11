import {
	registerMicroApps,
	runAfterFirstMounted,
	// setDefaultMountApp,
	start,
	initGlobalState,
	addGlobalUncaughtErrorHandler,
} from 'qiankun';
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from '@router';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import simpleAsync from '@utils/reduxSimpleAsync';
import rootReducer from '../rootReducer';

const { __REDUX_DEVTOOLS_EXTENSION__, MICRO_APPS, location } = window;
const store = applyMiddleware(thunk, simpleAsync)(createStore)(
	rootReducer,
	__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
);

const render = (App) => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root'),
	);
};

render(RootRouter);

/*
 * qiankun
 *
 * */

const apps = MICRO_APPS.map((app) => {
	return {
		name: app,
		entry: `${location.protocol}//${app}.${location.host}/`,
		container: '#micro_app',
		activeRule: `/${app}`,
		loader() {
			console.log(`${app} 加载！`);
		},
	};
});

registerMicroApps(apps, {
	beforeLoad: [
		(app) => {
			console.log('[生命周期] beforeLoad', app.name);
		},
	],
	beforeMount: [
		(app) => {
			console.log('[生命周期] beforeMount', app.name);
		},
	],
	afterMount: [
		(app) => {
			console.log('[生命周期] afterMount', app.name);
		},
	],
	beforeUnmount: [
		(app) => {
			console.log('[生命周期] beforeUnmount', app.name);
		},
	],
	afterUnmount: [
		(app) => {
			console.log('[生命周期] afterUnmount', app.name);
		},
	],
});

/**
 * 全局变量
 */
const { onGlobalStateChange, setGlobalState } = initGlobalState({
	app1_hotUpdate: false,
	app2_hotUpdate: false,
});

onGlobalStateChange((value, prev) => {
	console.log('全局变量变动触发', value, prev);
});

setGlobalState({
	user: 'wangjian',
});

/**
 * 添加全局的未捕获异常处理
 */
const handler = function (e) {
	console.log('未捕获的异常：');
	console.log(e);
};
addGlobalUncaughtErrorHandler(handler);

/**
 * 启动应用
 */
start({
	// prefetch: 'all',
	fetch(url, obj) {
		console.log('fetch参数', url, obj);
		// 给指定的微应用 entry 开启跨域请求
		if (url.indexOf(`.${location.host}`) !== -1) {
			return window.fetch(url, {
				...obj,
				mode: 'cors',
				credentials: 'include',
			});
		}
		return window.fetch(url, obj);
	},
});

runAfterFirstMounted(() => {
	console.log('第一个微应用 - 首次挂载！', process.env.NODE_ENV);
});
