import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'base',
		icon: <HddOutlined />,
		text: '基础资料',
		subMenuGroup: [
			{
				menuKey: '2',
				path: '/goods/add',
				icon: null,
				text: '新增物品',
			},
			{
				menuKey: '3',
				path: '/goods/list',
				icon: null,
				text: '物品列表',
			},
			{
				menuKey: '4',
				path: '/supplier/add',
				icon: null,
				text: '新增供应商',
			},
			{
				menuKey: '5',
				path: '/supplier/list',
				icon: null,
				text: '供应商列表',
			},
		],
	},
];

export default menuData;
