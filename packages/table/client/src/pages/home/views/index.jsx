import React from 'react';
import { Table, Search, withTable, useTable } from 'table-render';
import { Tag, Space, message, Tooltip, Button } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from '@utils/axios';

const schema = {
	type: 'object',
	properties: {
		state: {
			title: '酒店状态',
			type: 'string',
			enum: ['open', 'closed'],
			enumNames: ['营业中', '已打烊'],
			width: '25%',
			widget: 'select',
		},
		labels: {
			title: '酒店星级',
			type: 'string',
			width: '25%',
		},
		created_at: {
			title: '成立时间',
			type: 'string',
			format: 'date',
			width: '25%',
		},
	},
	'ui:labelWidth': 80,
};

const Demo = () => {
	const { refresh } = useTable();

	const searchApi = (params, sorter) => {
		console.group(sorter);
		return axios
			.get('https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic', { params })
			.then((res) => {
				console.log('res', res);
				if (res.data && res.data.data) {
					return {
						rows: res.data.data,
						total: res.data.data.length,
					};
				}
			})
			.catch((e) => {
				console.log('Oops, error', e);

				// 注意一定要返回 rows 和 total
				return {
					rows: [],
					total: 0,
				};
			});
	};

	const searchApi2 = (params) => {
		return axios
			.get('https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic', { params })
			.then((res) => {
				if (res.data && res.data.data) {
					return {
						rows: res.data.data.slice(1),
						total: res.data.data.length - 1,
					};
				}
			})
			.catch((e) => {
				console.log('Oops, error', e);
				return {
					rows: [],
					total: 0,
				};
			});
	};

	// 配置完全透传antd table
	const columns = [
		{
			title: '酒店名称',
			dataIndex: 'title',
			valueType: 'text',
			width: '20%',
		},
		{
			title: '酒店地址',
			dataIndex: 'address',
			ellipsis: true,
			copyable: true,
			valueType: 'text',
			width: '25%',
		},
		{
			title: (
				<>
					酒店状态
					<Tooltip placement="top" title="使用valueType">
						<InfoCircleOutlined style={{ marginLeft: 6 }} />
					</Tooltip>
				</>
			),
			enum: {
				open: '营业中',
				closed: '已打烊',
			},
			dataIndex: 'state',
		},
		{
			title: '酒店星级',
			dataIndex: 'labels',
			render: (_, row) => (
				<Space>
					{row.labels.map(({ name, color }) => (
						<Tag color={color} key={name}>
							{name}
						</Tag>
					))}
				</Space>
			),
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
					<a target="_blank" key="1">
						<div
							onClick={() => {
								message.success('预订成功');
							}}
						>
							预订
						</div>
					</a>
				</Space>
			),
		},
	];

	const showData = () => {
		refresh(null, { extra: 1 });
	};

	return (
		<div style={{ background: 'rgb(245,245,245)' }}>
			<Search
				schema={schema}
				displayType="row"
				api={[
					{
						name: '全部数据',
						api: searchApi,
					},
					{
						name: '我的数据',
						api: searchApi2,
					},
				]}
			/>
			<Table
				pagination={{ pageSize: 4 }}
				columns={columns}
				rowKey="id"
				toolbarRender={() => [
					<Button key="show" onClick={showData}>
						查看日志
					</Button>,
					<Button key="out" onClick={showData}>
						导出数据
					</Button>,
					<Button key="primary" type="primary" onClick={() => alert('table-render！')}>
						<PlusOutlined />
						创建
					</Button>,
				]}
				toolbarAction
			/>
		</div>
	);
};

export default withTable(Demo);
