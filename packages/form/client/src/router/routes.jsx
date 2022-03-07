import React from 'react';
import { LayoutBase } from 'lcdp-rc';

const routes = [
	{
		path: '/template/add',
		exact: true,
		key: '/template/add',
		breadcrumb: ['Form', '新增Form模板'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/template/add')),
	},
	{
		path: '/template/list',
		exact: true,
		key: '/template/list',
		breadcrumb: ['Form', 'Form模板列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/list',
		exact: true,
		key: '/list',
		breadcrumb: ['Form', '新增Form页面'],
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
