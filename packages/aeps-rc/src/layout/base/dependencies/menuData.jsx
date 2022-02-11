import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		menuKey: '1',
		path: '/',
		icon: <HomeOutlined />,
		text: '首页',
	},
	{
		subMenuKey: 'base',
		icon: <HddOutlined />,
		text: '基础资料',
		subMenuGroup: [
			{
				menuKey: '2',
				path: '/app1/goods/add',
				icon: null,
				text: '新增物品',
			},
			{
				menuKey: '3',
				path: '/app1/goods/list',
				icon: null,
				text: '物品列表',
			},
			{
				menuKey: '4',
				path: '/app1/supplier/add',
				icon: null,
				text: '新增供应商',
			},
			{
				menuKey: '5',
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
				menuKey: '6',
				path: '/app2/pm/add',
				icon: null,
				text: '新增项目',
			},
			{
				menuKey: '7',
				path: '/app2/pm/list',
				icon: null,
				text: '项目列表',
			},
		],
	},
];

export default menuData;
