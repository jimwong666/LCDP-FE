import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'pm',
		icon: <ReconciliationOutlined />,
		text: '项目管理',
		subMenuGroup: [
			{
				menuKey: '/pm/add',
				path: '/pm/add',
				icon: null,
				text: '新增项目',
			},
			{
				menuKey: '/pm/list',
				path: '/pm/list',
				icon: null,
				text: '项目列表',
			},
		],
	},
];

export default menuData;
