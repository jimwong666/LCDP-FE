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
	{
		path: '/app1/goods/add',
		exact: true,
		key: '/app1/goods/add',
		breadcrumb: ['基础资料', '新增物品'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/app1/goods/list',
		exact: true,
		key: '/app1/goods/list',
		breadcrumb: ['基础资料', '物品列表'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/app1/supplier/add',
		exact: true,
		key: '/app1/supplier/add',
		breadcrumb: ['基础资料', '新增供应商'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/app1/supplier/list',
		exact: true,
		key: '/app1/supplier/list',
		breadcrumb: ['基础资料', '供应商列表'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/app2/pm/add',
		exact: true,
		key: '/app2/pm/add',
		breadcrumb: ['项目管理', '新增项目'],
		componentTemplate: LayoutBase,
		child: null,
	},
	{
		path: '/app2/pm/list',
		exact: true,
		key: '/app2/pm/list',
		breadcrumb: ['项目管理', '项目列表'],
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
