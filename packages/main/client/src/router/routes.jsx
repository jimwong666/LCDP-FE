import React from 'react';
import { LayoutBase } from 'aeps-rc';

const routes = [
	{
		path: '/',
		exact: true,
		key: '/',
		breadcrumb: ['工作台'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	// app1
	{
		path: '/app1/*',
		exact: true,
		key: '/app1/*',
		breadcrumb: ['表单'],
		componentTemplate: LayoutBase,
		child: null,
	},
	// app2
	{
		path: '/app2/*',
		exact: true,
		key: '/app2/*',
		breadcrumb: ['列表'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/about',
		exact: true,
		key: '/about',
		breadcrumb: ['关于'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/about')),
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
