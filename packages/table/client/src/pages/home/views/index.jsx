import React, { useState, useRef } from 'react';
import { Table, Search, withTable, useTable } from 'table-render';
import { Tag, Space, message, Tooltip, Button, Form, Row, Col, Input, Divider, Select, Switch } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ShowTable from '@components/business/showTable';
import classNames from 'classnames/bind';
import styles from '../styles/index.scss';

const cx = classNames.bind(styles);

const Demo = () => {
	const searchFormRef = useRef();
	const [searchList, setSearchList] = useState([0]);

	return (
		<div className={cx('table-template')}>
			<header className={cx('template-header')}>
				<Form
					// ref={form}
					name=""
					className="templateInfo"
					onFinish={() => {}}
					initialValues={{}}
				>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item name="pageName" label="模板名称" rules={[{ required: true, message: '请填写模板名称！' }]}>
								<Input allowClear placeholder="请填写模板名称" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</header>

			<article className={cx('template-content')}>
				<header className={cx('content-header')}>
					<Button>清空</Button>
				</header>
				<div className={cx('content-main')}>
					<section className={cx('main-controller')} style={{}}>
						<Divider orientation="left" orientationMargin="0">
							搜索项
						</Divider>

						<Row
							style={{
								textAlign: 'center',
								marginBottom: '10px',
							}}
						>
							<Col span={5}>
								<span>*</span>字段显示名
							</Col>
							<Col span={5}>字段name</Col>
							<Col span={5}>字段类型</Col>
							<Col span={5}>placeholder</Col>
							<Col span={4}>操作</Col>
						</Row>

						<Form ref={searchFormRef}>
							<Form.List name="searchFields" initialValue={[{}]}>
								{(fields, { add, remove }) => {
									return (
										<Space direction="vertical" size="small">
											{fields.map((field, index) => (
												<div key={field.key} className={index % 2 === 1 ? 'list-odd' : 'list-even'}>
													<Row gutter={10}>
														<Col span={5}>
															<Form.Item name={[field.name, 'showName']} noStyle>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item name={[field.name, 'name']} noStyle>
																<Input />
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item name={[field.name, 'type']} noStyle>
																<Select allowClear placeholder="请选择" style={{ width: '100%' }}>
																	<Select.Option value="1">String</Select.Option>
																	<Select.Option value="0">Array</Select.Option>
																</Select>
															</Form.Item>
														</Col>
														<Col span={5}>
															<Form.Item name={[field.name, 'placeholder']} noStyle>
																<Input defaultValue="请输入" />
															</Form.Item>
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
															<Button type="link" size="small" onClick={() => add(null, index + 1)}>
																<PlusOutlined />
															</Button>
															{fields?.length > 1 && (
																<Button type="link" size="small" onClick={() => remove(field.name)}>
																	<MinusOutlined />
																</Button>
															)}
														</Col>
													</Row>
												</div>
											))}
										</Space>
									);
								}}
							</Form.List>
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
							<Col span={2}>操作</Col>
						</Row>

						<Form>
							<Form.List name="tableFields" initialValue={[{}]}>
								{(fields, { add, remove }) => {
									return (
										<Space direction="vertical" size="small">
											{fields.map((field, index) => (
												<div key={field.key} className={index % 2 === 1 ? 'list-odd' : 'list-even'}>
													<Row gutter={10}>
														<Col span={4}>
															<Input />
														</Col>
														<Col span={4}>
															<Input />
														</Col>
														<Col span={4}>
															<Select allowClear placeholder="请选择" style={{ width: '100%' }}>
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
															<Button type="link" size="small" onClick={() => add(null, index + 1)}>
																<PlusOutlined />
															</Button>
															{fields?.length > 1 && (
																<Button type="link" size="small" onClick={() => remove(field.name)}>
																	<MinusOutlined />
																</Button>
															)}
														</Col>
													</Row>
												</div>
											))}
										</Space>
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
					onClick={() => {
						console.log(searchFormRef.current?.getFieldsValue());
					}}
				>
					提交
				</Button>
			</footer>
		</div>
	);
};

export default Demo;
