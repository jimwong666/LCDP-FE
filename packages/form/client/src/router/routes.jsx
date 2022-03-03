import React from 'react';
import { LayoutBase } from 'lcdp-rc';

const routes = [
	{
		path: '/template/add',
		exact: true,
		key: '/template/add',
		breadcrumb: ['表单', '新增模板'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/template/add')),
	},
	{
		path: '/template/list',
		exact: true,
		key: '/template/list',
		breadcrumb: ['表单', '模板列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/list',
		exact: true,
		key: '/list',
		breadcrumb: ['表单', '成品列表'],
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
