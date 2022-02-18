import React from 'react';
import { LayoutBase } from 'aeps-rc';

const routes = [
	{
		path: '/',
		exact: true,
		key: '/',
		breadcrumb: ['首页'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/work',
		exact: true,
		key: '/work',
		breadcrumb: ['工作'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/work')),
	},
	// app1
	{
		path: '/app1/*',
		exact: true,
		key: '/app1/*',
		breadcrumb: ['基础资料'],
		componentTemplate: LayoutBase,
		child: null,
	},
	// app2
	{
		path: '/app2/*',
		exact: true,
		key: '/app2/*',
		breadcrumb: ['项目管理'],
		componentTemplate: LayoutBase,
		child: null,
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
