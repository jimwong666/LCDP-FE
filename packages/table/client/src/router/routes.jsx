import React from 'react';
import { LayoutBase } from 'lcdp-rc';

const routes = [
	{
		path: '/template/add',
		exact: true,
		key: '/template/add',
		breadcrumb: ['Table', '新增Table模板'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/template/list',
		exact: true,
		key: '/template/list',
		breadcrumb: ['Table', 'Table模板列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/list',
		exact: true,
		key: '/list',
		breadcrumb: ['Table', '新增Table页面'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/list')),
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
