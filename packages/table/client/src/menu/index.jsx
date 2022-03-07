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
				text: '新增Table模板',
			},
			{
				menuKey: '/template/list',
				path: '/template/list',
				icon: null,
				text: 'Table模板列表',
			},
			{
				menuKey: '/list',
				path: '/list',
				icon: null,
				text: '新增Table页面',
			},
		],
	},
];

export default menuData;
