import React from 'react';
import { BorderlessTableOutlined, OrderedListOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons';

const menuData = [
	{
		menuKey: '/',
		path: '/',
		icon: <BorderlessTableOutlined />,
		text: '工作台',
	},
	{
		subMenuKey: 'form',
		icon: <FormOutlined />,
		text: '表单',
		subMenuGroup: [
			{
				menuKey: '/app1/template/add',
				path: '/app1/template/add',
				icon: null,
				text: '模板新增',
			},
			{
				menuKey: '/app1/template/list',
				path: '/app1/template/list',
				icon: null,
				text: '模板列表',
			},
			{
				menuKey: '/app1/list',
				path: '/app1/list',
				icon: null,
				text: '成品列表',
			},
		],
	},
	{
		subMenuKey: 'list',
		icon: <OrderedListOutlined />,
		text: '列表',
		subMenuGroup: [
			{
				menuKey: '/app2/template/add',
				path: '/app2/template/add',
				icon: null,
				text: '模板新增',
			},
			{
				menuKey: '/app2/template/list',
				path: '/app2/template/list',
				icon: null,
				text: '模板列表',
			},
			{
				menuKey: '/app2/list',
				path: '/app2/list',
				icon: null,
				text: '成品列表',
			},
		],
	},
	{
		menuKey: '/about',
		path: '/about',
		icon: <InfoCircleOutlined />,
		text: '关于',
	},
];

export default menuData;
