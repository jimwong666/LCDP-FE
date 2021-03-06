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
				menuKey: '/form/template/add',
				path: '/form/template/add',
				icon: null,
				text: '新增Form模板',
			},
			{
				menuKey: '/form/template/list',
				path: '/form/template/list',
				icon: null,
				text: 'Form模板列表',
			},
			{
				menuKey: '/form/list',
				path: '/form/list',
				icon: null,
				text: '新增Form页面',
			},
		],
	},
	{
		subMenuKey: 'table',
		icon: <OrderedListOutlined />,
		text: '列表',
		subMenuGroup: [
			{
				menuKey: '/table/template/add',
				path: '/table/template/add',
				icon: null,
				text: '新增Table模板',
			},
			{
				menuKey: '/table/template/list',
				path: '/table/template/list',
				icon: null,
				text: 'Table模板列表',
			},
			{
				menuKey: '/table/list',
				path: '/table/list',
				icon: null,
				text: '新增Table页面',
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
