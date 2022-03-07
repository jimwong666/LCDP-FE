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
				text: '新增Form模板',
			},
			{
				menuKey: '/template/list',
				path: '/template/list',
				icon: null,
				text: 'Form模板列表',
			},
			{
				menuKey: '/list',
				path: '/list',
				icon: null,
				text: '新增Form页面',
			},
		],
	},
];

export default menuData;
