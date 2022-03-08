import React from 'react';
import { Table, Search, withTable, useTable } from 'table-render';
import { Tag, Space, message, Tooltip, Button, Form, Row, Col, Input, Divider, Select, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import axios from '@utils/axios';

// 搜索项
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

// Table 字段
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

const Demo = () => {
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
		<div style={{ border: '1px solid #eee' }}>
			<Form
				// form={form}
				name=""
				className="templateInfo"
				onFinish={() => {}}
				initialValues={{}}
				style={{
					padding: '20px 20px 0',
					borderBottom: '1px solid #eee',
				}}
			>
				<Row gutter={24}>
					<Col span={6}>
						<Form.Item name="pageName" label="模板名称" rules={[{ required: true, message: '请填写模板名称！' }]}>
							<Input allowClear placeholder="请填写模板名称" />
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<article
				style={{
					height: '1000px',
					display: 'flex',
				}}
			>
				<section
					style={{
						flex: '1 1 40%',
						boxSizing: 'border-box',
						padding: '20px',
					}}
				>
					<Divider orientation="left" orientationMargin="0">
						搜索项
					</Divider>

					<Row
						style={{
							textAlign: 'center',
							marginBottom: '10px',
						}}
					>
						<Col span={4} offset={1}>
							字段显示名
						</Col>
						<Col span={4} offset={1}>
							字段name
						</Col>
						<Col span={4} offset={1}>
							字段类型
						</Col>
						<Col span={4} offset={1}>
							placeholder
						</Col>
						<Col span={4}>操作</Col>
					</Row>

					<Form>
						<Form.Item>
							<Form.Item name="field" noStyle>
								<Row>
									<Col span={4} offset={1}>
										<Input />
									</Col>
									<Col span={4} offset={1}>
										<Input />
									</Col>
									<Col span={4} offset={1}>
										<Select allowClear placeholder="请选择">
											<Select.Option value="1">String</Select.Option>
											<Select.Option value="0">Array</Select.Option>
										</Select>
									</Col>
									<Col span={4} offset={1}>
										<Input />
									</Col>
									<Col
										span={4}
										style={{
											textAlign: 'center',
										}}
									>
										<Button type="link">
											<PlusOutlined />
										</Button>
										<Button type="link">
											<MinusOutlined />
										</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form.Item>
					</Form>

					<Divider orientation="left" orientationMargin="0">
						Table 字段
					</Divider>

					<Row
						gutter={10}
						style={{
							textAlign: 'center',
							marginBottom: '10px',
						}}
					>
						<Col span={4}>字段显示名</Col>
						<Col span={4}>字段name</Col>
						<Col span={4}>字段类型</Col>
						<Col span={3}>列宽度</Col>
						<Col span={4}>是否超出省略</Col>
						<Col span={3}>是否排序</Col>
						<Col span={2}>操作21</Col>
					</Row>

					<Form>
						<Form.Item>
							<Form.Item name="field" noStyle>
								<Row gutter={10}>
									<Col span={4}>
										<Input />
									</Col>
									<Col span={4}>
										<Input />
									</Col>
									<Col span={4}>
										<Select allowClear placeholder="请选择">
											<Select.Option value="1">String</Select.Option>
											<Select.Option value="0">Array</Select.Option>
										</Select>
									</Col>
									<Col span={3}>
										<Input />
									</Col>
									<Col
										span={4}
										style={{
											textAlign: 'center',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
									</Col>
									<Col
										span={3}
										style={{
											textAlign: 'center',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
									</Col>
									<Col
										span={2}
										style={{
											textAlign: 'center',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<Button type="link" size={'small'}>
											<PlusOutlined />
										</Button>
										<Button type="link" size={'small'}>
											<MinusOutlined />
										</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form.Item>
					</Form>
				</section>
				<section
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: '1 1 60%',
						borderLeft: '1px solid #eee',
						background: '#fafafa',
					}}
				>
					<header
						style={{
							borderBottom: '1px solid #eee',
							padding: '8px 10px',
							background: '#fff',
						}}
					>
						<Button>清空</Button>
					</header>
					<div
						style={{
							flex: '1 1 auto',
							padding: '10px',
						}}
					>
						<Search schema={schema} displayType="row" api={searchApi} />
						<Table columns={columns} rowKey="id" />
					</div>
				</section>
			</article>
		</div>
	);
};

export default withTable(Demo);
