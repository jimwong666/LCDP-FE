import React from 'react';
import { OrderedListOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'list',
		icon: <OrderedListOutlined />,
		text: '列表',
		subMenuGroup: [
			{
				menuKey: '/template/add',
				path: '/template/add',
				icon: null,
				text: '模板新增',
			},
			{
				menuKey: '/template/list',
				path: '/template/list',
				icon: null,
				text: '模板列表',
			},
			{
				menuKey: '/list',
				path: '/list',
				icon: null,
				text: '成品列表',
			},
		],
	},
];

export default menuData;
