import React from 'react';
import { Input, Form, Row, Col } from 'antd';
import Generator from 'fr-generator';

const defaultValue = {
	type: 'object',
	properties: {
		inputName: {
			title: '简单输入框',
			type: 'string',
		},
	},
};

const Demo = () => {
	return (
		<div style={{ border: '1px solid #eee' }}>
			<Form
				// form={form}
				name=""
				className={'templateInfo'}
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
			<div style={{ height: '1000px' }}>
				<Generator defaultValue={defaultValue} extraButtons={[['编辑', '预览'], true, '导入 schema', '展示 schema']} />
			</div>
		</div>
	);
};

export default Demo;
