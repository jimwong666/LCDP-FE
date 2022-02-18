import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'base',
		icon: <HddOutlined />,
		text: '基础资料',
		subMenuGroup: [
			{
				menuKey: '/goods/add',
				path: '/goods/add',
				icon: null,
				text: '新增物品',
			},
			{
				menuKey: '/goods/list',
				path: '/goods/list',
				icon: null,
				text: '物品列表',
			},
			{
				menuKey: '/supplier/add',
				path: '/supplier/add',
				icon: null,
				text: '新增供应商',
			},
			{
				menuKey: '/supplier/list',
				path: '/supplier/list',
				icon: null,
				text: '供应商列表',
			},
		],
	},
];

export default menuData;
