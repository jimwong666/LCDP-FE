import React, { useState, useRef, createRef } from 'react';
import { Table, Search, withTable, useTable } from 'table-render';
import { Tag, Space, message, Tooltip, Button, Form, Row, Col, Input, Divider, Select, Switch } from 'antd';
import { PlusOutlined, MinusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ShowTable from '@components/business/showTable';
import classNames from 'classnames/bind';
import styles from '../styles/index.scss';

const cx = classNames.bind(styles);

const Demo = () => {
	const formRef = createRef();
	const searchFormRef = createRef();
	const tableFormRef = createRef();
	const [searchList, setSearchList] = useState([0]);

	return (
		<div className={cx('table-template')}>
			<header className={cx('template-header')}>
				<Form ref={formRef} name="form" className="templateInfo" onFinish={() => {}} initialValues={{}}>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item name="pageName" label="页面名称" rules={[{ required: true, message: '此项为必填项！' }]}>
								<Input allowClear placeholder="请填写页面名称" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</header>

			<article className={cx('template-content')}>
				<header className={cx('content-header')}>
					<div className={cx('content-header-left')}>
						<Space>
							<Button type="primary">整体参数设置</Button>
							<Button type="primary" danger>
								SQL编写
							</Button>
						</Space>
					</div>
					<div className={cx('content-header-right')}>
						<Space>
							<Button type="primary">生成效果</Button>
						</Space>
					</div>
				</header>
				<div className={cx('content-main')}>
					<section className={cx('main-controller')} style={{}}>
						{/* 搜索项 */}
						<Divider orientation="left" orientationMargin="0">
							搜索项
						</Divider>
						<Row
							gutter={10}
							style={{
								textAlign: 'center',
								marginBottom: '10px',
							}}
						>
							<Col span={5}>字段名</Col>
							<Col span={5}>
								字段name
								<Tooltip placement="top" title="时间范围以 _start 和 _end 结尾">
									<InfoCircleOutlined style={{ marginLeft: 6 }} />
								</Tooltip>
							</Col>
							<Col span={5}>字段类型</Col>
							<Col span={5}>更多操作</Col>
						</Row>

						<Form
							ref={searchFormRef}
							// onFinish={(values) => {
							// 	console.log(values);
							// }}
						>
							<Form.List name="searchFields" initialValue={[{}]}>
								{(fields, { add, remove }) => {
									return (
										<>
											{fields.map((field, index) => (
												<div key={field.key} className={index % 2 === 1 ? 'list-odd' : 'list-even'}>
													<Row gutter={10}>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'showName']}
																rules={[{ required: true, message: '此项为必填项！' }]}
															>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'name']}
																rules={[{ required: true, message: '此项为必填项！' }]}
															>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'type']}
																rules={[{ required: true, message: '此项为必填项！' }]}
															>
																<Select allowClear placeholder="请选择" style={{ width: '100%' }}>
																	<Select.Option value="0">输入框</Select.Option>
																	<Select.Option value="1">单选框</Select.Option>
																	<Select.Option value="2">多选框</Select.Option>
																	<Select.Option value="3">日期选择框</Select.Option>
																	<Select.Option value="4">时间选择框</Select.Option>
																	<Select.Option value="5">日期时间选择框</Select.Option>
																</Select>
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item>
																<div style={{ textAlign: 'center' }}>
																	<Button type="link" onClick={() => console.log('more properties')}>
																		设置其他属性
																	</Button>
																</div>
															</Form.Item>
														</Col>
														<Col span={4}>
															<Form.Item>
																<div style={{ textAlign: 'center' }}>
																	<Button type="link" size="small" onClick={() => add(null, index + 1)}>
																		<PlusOutlined />
																	</Button>
																	{fields?.length > 1 && (
																		<Button type="link" size="small" onClick={() => remove(field.name)}>
																			<MinusOutlined />
																		</Button>
																	)}
																</div>
															</Form.Item>
														</Col>
													</Row>
												</div>
											))}
										</>
									);
								}}
							</Form.List>
						</Form>

						{/* 展示字段 */}
						<Divider orientation="left" orientationMargin="0">
							展示字段
						</Divider>

						<Row
							gutter={10}
							style={{
								textAlign: 'center',
								marginBottom: '10px',
							}}
						>
							<Col span={5}>字段名</Col>
							<Col span={5}>字段name</Col>
							<Col span={5}>是否可排序</Col>
							<Col span={6}>更多操作</Col>
						</Row>

						<Form
							ref={tableFormRef}
							initialValues={{
								tableFields: [
									{
										name: 'q',
										showName: '11111',
										sort: true,
									},
								],
							}}
						>
							<Form.List name="tableFields" initialValue={[{}]}>
								{(fields, { add, remove }) => {
									return (
										<>
											{fields.map((field, index) => (
												<div key={field.key} className={index % 2 === 1 ? 'list-odd' : 'list-even'}>
													<Row gutter={10}>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'showName']}
																rules={[{ required: true, message: '此项为必填项！' }]}
															>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'name']}
																rules={[{ required: true, message: '此项为必填项！' }]}
															>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item
																name={[field.name, 'sort']}
																valuePropName="checked"
																style={{ textAlign: 'center' }}
															>
																<Switch checkedChildren="是" unCheckedChildren="否" />
															</Form.Item>
														</Col>
														<Col span={6}>
															<div style={{ textAlign: 'center' }}>
																<Button type="link" onClick={() => console.log('more properties')}>
																	设置其他属性
																</Button>
															</div>
														</Col>
														<Col span={3}>
															<Form.Item>
																<div style={{ textAlign: 'center' }}>
																	<Button type="link" size="small" onClick={() => add(null, index + 1)}>
																		<PlusOutlined />
																	</Button>
																	{fields?.length > 1 && (
																		<Button type="link" size="small" onClick={() => remove(field.name)}>
																			<MinusOutlined />
																		</Button>
																	)}
																</div>
															</Form.Item>
														</Col>
													</Row>
												</div>
											))}
										</>
									);
								}}
							</Form.List>
						</Form>
					</section>
					<section className={cx('main-show')}>
						<ShowTable
							metaData={{ schema: {}, columns: {} }}
							metaDataUrl=""
							data={{
								rows: [],
								total: 0,
							}}
							dataUrl=""
						/>
					</section>
				</div>
			</article>

			<footer className={cx('template-footer')}>
				<Button
					type="primary"
					danger
					onClick={() => {
						console.log(111);
					}}
				>
					清空配置
				</Button>
				<Button
					type="primary"
					onClick={() => {
						// searchFormRef.current?.validateFields();
						tableFormRef.current
							?.validateFields()
							.then((data) => console.log('data', data))
							.catch((err) => console.log('err', err));
						// formRef.current?.validateFields();
						// console.log(searchFormRef.current?.getFieldsValue());
					}}
				>
					提交
				</Button>
			</footer>
		</div>
	);
};

export default Demo;
