import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		menuKey: '/',
		path: '/',
		icon: <HomeOutlined />,
		text: '首页',
	},
	{
		menuKey: '/work',
		path: '/work',
		icon: <HomeOutlined />,
		text: '工作',
	},
	{
		subMenuKey: 'base',
		icon: <HddOutlined />,
		text: '基础资料',
		subMenuGroup: [
			{
				menuKey: '/app1/goods/add',
				path: '/app1/goods/add',
				icon: null,
				text: '新增物品',
			},
			{
				menuKey: '/app1/goods/list',
				path: '/app1/goods/list',
				icon: null,
				text: '物品列表',
			},
			{
				menuKey: '/app1/supplier/add',
				path: '/app1/supplier/add',
				icon: null,
				text: '新增供应商',
			},
			{
				menuKey: '/app1/supplier/list',
				path: '/app1/supplier/list',
				icon: null,
				text: '供应商列表',
			},
		],
	},
	{
		subMenuKey: 'pm',
		icon: <ReconciliationOutlined />,
		text: '项目管理',
		subMenuGroup: [
			{
				menuKey: '/app2/pm/add',
				path: '/app2/pm/add',
				icon: null,
				text: '新增项目',
			},
			{
				menuKey: '/app2/pm/list',
				path: '/app2/pm/list',
				icon: null,
				text: '项目列表',
			},
		],
	},
];

export default menuData;
