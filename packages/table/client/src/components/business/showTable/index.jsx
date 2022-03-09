import React from 'react';
import { Table, Search, withTable, useTable } from 'table-render';
import { Tag, Space, message, Tooltip, Button, Form, Row, Col, Input, Divider, Select, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import axios from '@utils/axios';
import Demo from '../../../pages/home';

// 预览 Table
const ShowTable = withTable(() => {
	// 搜索项 元数据
	const schema = {
		type: 'object',
		properties: {
			inputName: {
				title: '简单输入框',
				type: 'string',
				props: {},
			},
			select_jb8R1N: {
				title: '单选',
				type: 'string',
				enum: ['a', 'b', 'c'],
				enumNames: ['早', '中', '晚'],
				widget: 'select',
			},
			multiSelect_opVhaX: {
				title: '多选',
				type: 'array',
				items: {
					type: 'string',
				},
				enum: ['A', 'B', 'C', 'D'],
				enumNames: ['杭州', '武汉', '湖州', '贵阳'],
				widget: 'multiSelect',
			},
			date_pnnWfb: {
				title: '日期选择data',
				type: 'string',
				format: 'date',
			},
			date_sffa: {
				title: '日期选择time',
				type: 'string',
				format: 'time',
			},
			date_dateTime: {
				title: '日期选择dateTime',
				type: 'string',
				format: 'dateTime',
			},
			dateRange_RGh_yD: {
				title: '日期范围',
				type: 'range',
				format: 'dateTime',
				props: {
					placeholder: ['开始时间', '结束时间'],
				},
			},
		},
		column: 3,
		labelWidth: 120,
	};

	// Table 字段 元数据
	const columns = [
		{
			title: '酒店名称',
			dataIndex: 'title',
			valueType: 'text',
			width: '10%',
		},
		{
			title: '酒店地址',
			dataIndex: 'address',
			ellipsis: true,
			valueType: 'text',
			width: '25%',
		},
		{
			title: '酒店状态',
			enum: {
				open: '营业中',
				closed: '已打烊',
			},
			dataIndex: 'state',
		},
		{
			title: '酒店GMV',
			key: 'money',
			sorter: true,
			dataIndex: 'money',
			valueType: 'money',
		},
		{
			title: '成立时间',
			key: 'created_at',
			dataIndex: 'created_at',
			valueType: 'date',
		},
		{
			title: '操作',
			render: () => (
				<Space>
					<Button
						type="link"
						onClick={() => {
							message.success('预订成功');
						}}
					>
						预订
					</Button>
				</Space>
			),
		},
	];

	// table 展示数据
	const searchApi = (params, sorter = { field: '', order: '' }) => {
		return axios
			.get('https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic', {
				...params,
				sorterField: sorter.field,
				sorterOrder: sorter.order,
			})
			.then((res) => {
				if (res.data && res.data.data) {
					return {
						rows: res.data.data,
						total: res.data.data.length,
					};
				}
				return {
					rows: [],
					total: 0,
				};
			})
			.catch((e) => {
				console.log('出错了：', e);

				// 注意一定要返回 rows 和 total
				return {
					rows: [],
					total: 0,
				};
			});
	};

	return (
		<>
			<Search schema={schema} displayType="row" api={searchApi} />
			<Table columns={columns} rowKey="id" />
		</>
	);
});

export default ShowTable;
