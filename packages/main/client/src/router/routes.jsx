import React from 'react';
import { LayoutBase } from 'lcdp-rc';

const routes = [
	{
		path: '/',
		exact: true,
		key: '/',
		breadcrumb: ['工作台'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	// form
	{
		path: '/form/*',
		exact: true,
		key: '/form/*',
		breadcrumb: ['表单'],
		componentTemplate: LayoutBase,
		child: null,
	},
	// table
	{
		path: '/table/*',
		exact: true,
		key: '/table/*',
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
