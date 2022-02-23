import React from 'react';
import { LayoutBase } from 'aeps-rc';

const routes = [
	{
		path: '/template/add',
		exact: true,
		key: '/template/add',
		breadcrumb: ['列表', '新增模板'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/template/list',
		exact: true,
		key: '/template/list',
		breadcrumb: ['列表', '模板列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/list',
		exact: true,
		key: '/list',
		breadcrumb: ['列表', '成品列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '*',
		key: '',
		breadcrumb: [],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/404')),
	},
];

export default routes;
