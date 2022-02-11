import React from 'react';
import { HomeOutlined, ReconciliationOutlined, HddOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'pm',
		icon: <ReconciliationOutlined />,
		text: '项目管理',
		subMenuGroup: [
			{
				menuKey: '6',
				path: '/pm/add',
				icon: null,
				text: '新增项目',
			},
			{
				menuKey: '7',
				path: '/pm/list',
				icon: null,
				text: '项目列表',
			},
		],
	},
];

export default menuData;
