import React from 'react';
import { FormOutlined } from '@ant-design/icons';

const menuData = [
	{
		subMenuKey: 'form',
		icon: <FormOutlined />,
		text: '表单',
		subMenuGroup: [
			{
				menuKey: '/template/add',
				path: '/template/add',
				icon: null,
				text: '新增模板',
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
