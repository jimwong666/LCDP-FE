import React, { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import FormRender, { useForm } from 'form-render';
// import { fakeApi, delay } from './utils';

const Demo = () => {
	const form = useForm();
	const [schema, setSchema] = useState({});

	const getRemoteData = () => {
		// fakeApi('xxx/getForm').then((_) => {
		// 	form.setValues({ input1: 'hello world', select1: 'c' });
		// });
		form.setValues({ input1: 'hello world', select1: 'c' });
	};

	useEffect(() => {
		// 异步加载表单
		new Promise((res) => setTimeout(res, 1000)).then((_) => {
			setSchema({
				type: 'object',
				properties: {
					input1: {
						title: '简单输入框',
						type: 'string',
						required: true,
					},
					select1: {
						title: '单选',
						type: 'string',
						enum: ['a', 'b', 'c'],
						enumNames: ['早', '中', '晚'],
					},
				},
			});
		});
	}, []);

	const onFinish = (data, errors) => {
		if (errors.length > 0) {
			message.error(`校验未通过：${JSON.stringify(errors.map((item) => item.name))}`);
		} else {
			// fakeApi('xxx/submit', data).then((_) => message.success('提交成功！'));
			message.success('提交成功！');
		}
	};

	return (
		<div style={{ width: '400px' }}>
			<FormRender form={form} schema={schema} onFinish={onFinish} />
			<Space>
				<Button onClick={getRemoteData}>加载服务端数据</Button>
				<Button type="primary" onClick={form.submit}>
					提交（见console）
				</Button>
			</Space>
		</div>
	);
};

export default Demo;
