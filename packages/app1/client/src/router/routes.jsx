import React from 'react';
import { LayoutBase } from 'aeps-rc';

const routes = [
	{
		path: '/goods/add',
		exact: true,
		key: '/goods/add',
		breadcrumb: ['基础资料', '新增物品'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home/add')),
	},
	{
		path: '/goods/list',
		exact: true,
		key: '/goods/list',
		breadcrumb: ['基础资料', '物品列表'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/supplier/add',
		exact: true,
		key: '/supplier/add',
		breadcrumb: ['基础资料', '新增供应商'],
		componentTemplate: LayoutBase,
		child: React.lazy(() => import('@pages/home')),
	},
	{
		path: '/supplier/list',
		exact: true,
		key: '/supplier/list',
		breadcrumb: ['基础资料', '供应商列表'],
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
