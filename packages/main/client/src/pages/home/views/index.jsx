import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Table, Input, Radio, Form, Space, Button, Row, Col, Select, DatePicker, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/index.scss';
import { fetchTestAction, tempActionDispatchFormList, tempActionDispatchTableList } from '../actions';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

const mapStateToProps = (state) => ({
	fetchFormList: state.homeReducer.tempReducerFetchFormList,
	fetchTableList: state.homeReducer.tempReducerFetchTableList,
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			fetchTest: fetchTestAction,
			dispatchFormList: tempActionDispatchFormList,
			dispatchTableList: tempActionDispatchTableList,
		},
		dispatch,
	),
});

// 映射
const mapping = (pageType, props) => {
	const { dispatchFormList, dispatchTableList, fetchFormList, fetchTableList } = props;
	if (pageType === 'Table') {
		return {
			dispatch: dispatchTableList,
			listData: fetchTableList,
		};
	}
	return {
		dispatch: dispatchFormList,
		listData: fetchFormList,
	};
};

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

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listData: {},
			loading: true,
			pageType: 'Form',
		};
	}

	componentDidMount() {
		const { dispatchFormList } = this.props;
		dispatchFormList({}, () => {
			this.setState({
				loading: false,
			});
		});
	}

	static getDerivedStateFromProps(props, state) {
		const { pageType } = state;
		return mapping(pageType, props).listData?.isFetching || { listData: mapping(pageType, props).listData?.data };
	}

	render() {
		const { listData, loading, pageType } = this.state;

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
							<Button
								type="primary"
								onClick={() => {
									this.setState({
										loading: true,
									});
									mapping(pageType, this.props).dispatch({}, () => {
										this.setState({
											loading: false,
										});
									});
								}}
							>
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

							mapping(pageType, this.props).dispatch({ current, pageSize }, () => {
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
								value={pageType}
								onChange={(e) => {
									this.setState({
										pageType: e.target.value,
									});

									this.setState({
										loading: true,
									});

									mapping(e.target.value, this.props).dispatch({}, () => {
										this.setState({
											loading: false,
										});
									});
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
									<PlusOutlined /> 新增{pageType}页面
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
