import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Table, Input, Radio, Form, Space, Button, Row, Col, Select, DatePicker, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/index.scss';
import { fetchTestAction, asyncCustomTestFetchAction } from '../actions';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

const mapStateToProps = (state) => ({
	customTestFetch: state.getIn(['homeReducer', 'customTestFetch']),
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			fetchTest: fetchTestAction,
			asyncCustomTestFetch: asyncCustomTestFetchAction,
		},
		dispatch,
	),
});

const tableColumns = [
	{
		title: '序号',
		fixed: true,
		render: (text, record, index) => {
			// console.log(text, record, index);
			return index + 1;
		},
	},
	{
		title: '页面名称',
		dataIndex: 'pageName',
		fixed: true,
	},
	{
		title: '模板名称',
		dataIndex: 'templateName',
	},
	{
		title: '页面地址',
		dataIndex: 'path',
	},
	{
		title: '状态',
		dataIndex: 'status',
		filters: [
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'New York',
				value: 'New York',
			},
		],
		onFilter: (value, record) => record.address.indexOf(value) === 0,
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: '更新时间',
		dataIndex: 'updateTime',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: '操作',
		key: 'action',
		render: () => (
			<Space size="middle">
				<a>编辑</a>
				<a>停用</a>
				<a>删除</a>
			</Space>
		),
		width: 160,
		fixed: 'right',
	},
];

const data = [];
for (let i = 1; i <= 100; i++) {
	data.push({
		key: i,
		pageName: 'John Brown',
		templateName: '模板',
		path: 'a/b/c',
		status: Math.floor(Math.random() * 3),
		createTime: '20220102',
		updateTime: '20220102',
	});
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listData: {},
			loading: true,
		};
	}

	componentDidMount() {
		const { asyncCustomTestFetch } = this.props;
		asyncCustomTestFetch({}, () => {
			this.setState({
				loading: false,
			});
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { customTestFetch } = props;
		console.log('customTestFetch', customTestFetch);
		return customTestFetch?.isFetching || { listData: customTestFetch?.data };
	}

	render() {
		const { listData, loading } = this.state;
		const { asyncCustomTestFetch } = this.props;

		return (
			<div className={cx('home-content')}>
				<Form
					// form={form}
					name="advanced_search"
					className={cx('home-search-form')}
					onFinish={() => {}}
					initialValues={{
						'Field-1': 123,
						'Field-2': '2',
						'Field-3': '2',
					}}
				>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item name="pageName" label="页面名称">
								<Input allowClear placeholder="请填写页面名称" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="templateName" label="模板名称">
								<Input allowClear placeholder="请填写模板名称" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="status" label="状态">
								<Select allowClear placeholder="请选择状态">
									<Select.Option value="1">已启用</Select.Option>
									<Select.Option value="0">已停用</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="createTime" label="创建时间">
								<RangePicker renderExtraFooter={() => 'extra footer'} showTime />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="updateTime" label="更新时间">
								<RangePicker renderExtraFooter={() => 'extra footer'} showTime />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24} style={{ textAlign: 'right' }}>
							<Button type="primary" htmlType="submit">
								搜索
							</Button>
							<Button style={{ margin: '0 8px' }} onClick={() => {}}>
								重置
							</Button>
						</Col>
					</Row>
				</Form>
				<Divider />
				<Table
					columns={tableColumns}
					dataSource={listData?.data}
					scroll={
						{
							// x: '100vw',
							// y: '240px',
						}
					}
					bordered={false}
					loading={loading}
					pagination={{
						position: ['none', 'bottomRight'],
						hideOnSinglePage: true,
						showQuickJumper: true,
						current: listData?.current,
						pageSize: listData?.pageSize,
						total: listData?.total,
						onChange: (current, pageSize) => {
							this.setState({
								loading: true,
							});
							asyncCustomTestFetch({ current, pageSize }, () => {
								this.setState({
									loading: false,
								});
							});
						},
						// onShowSizeChange: (current, size) => {
						// 	console.log('onShowSizeChange', current, size);
						// },
					}}
					size="default"
					expandable={null}
					title={() => (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Radio.Group
								value="Form"
								onChange={(e) => {
									console.log(e, 'change');
								}}
							>
								<Radio.Button value="Form">
									<b>Form</b>
								</Radio.Button>
								<Radio.Button value="Table">
									<b>Table</b>
								</Radio.Button>
							</Radio.Group>

							<div>
								<Button
									type="primary"
									style={{
										marginLeft: '30px',
									}}
								>
									<PlusOutlined /> 新增Form页面
								</Button>
							</div>
						</div>
					)}
					showHeader
					footer={() => <>共 {listData?.total} 条</>}
					rowSelection={undefined}
					xScroll="scroll"
					yScroll="scroll"
					hasData
					tableLayout={null}
					top="none"
					bottom="bottomRight"
					ellipsis
				/>
			</div>
		);
	}
}
