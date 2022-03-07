import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';

const schema = {
	type: 'object',
	properties: {
		'list_2R1yd-': {
			title: '常规数组',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					input_u_nL4c: {
						title: '输入框',
						type: 'string',
						props: {},
					},
					textarea_49qzJ4: {
						title: '编辑框',
						type: 'string',
						format: 'textarea',
						props: {},
					},
					date_3eiUh6: {
						title: '日期选择',
						type: 'string',
						format: 'date',
					},
					checkbox_F4wXju: {
						title: '是否选择',
						type: 'boolean',
						widget: 'checkbox',
					},
					select_Xjdx5i: {
						title: '单选',
						type: 'string',
						enum: ['a', 'b', 'c'],
						enumNames: ['早', '中', '晚'],
						widget: 'select',
					},
				},
			},
			props: {},
		},
		simpleList_IG8EwM: {
			title: '简单数组',
			type: 'array',
			widget: 'simpleList',
			items: {
				type: 'object',
				properties: {
					input_CAtv3Z: {
						title: '输入框',
						type: 'string',
						props: {},
					},
					textarea_z3ZKHU: {
						title: '编辑框',
						type: 'string',
						format: 'textarea',
						props: {},
					},
					date_A5JWdf: {
						title: '日期选择',
						type: 'string',
						format: 'date',
					},
					number_ofAiyC: {
						title: '数字输入框',
						type: 'number',
					},
					select_mCuHUc: {
						title: '单选',
						type: 'string',
						enum: ['a', 'b', 'c'],
						enumNames: ['早', '中', '晚'],
						widget: 'select',
					},
				},
			},
			props: {},
		},
		list2_qtm4LP: {
			title: '表格数组',
			type: 'array',
			widget: 'list2',
			items: {
				type: 'object',
				properties: {
					input_l6VSI7: {
						title: '输入框',
						type: 'string',
						props: {},
					},
					textarea_e3WY_X: {
						title: '编辑框',
						type: 'string',
						format: 'textarea',
						props: {},
					},
					date_WBmhhJ: {
						title: '日期选择',
						type: 'string',
						format: 'date',
					},
					'number_LwnD-a': {
						title: '数字输入框',
						type: 'number',
					},
					checkbox_Cm7SyD: {
						title: '是否选择',
						type: 'boolean',
						widget: 'checkbox',
					},
					dateRange_FaPlTD: {
						title: '日期范围',
						type: 'range',
						format: 'dateTime',
						props: {
							placeholder: ['开始时间', '结束时间'],
						},
					},
				},
			},
			props: {},
		},
		drawerList_vix_zC: {
			title: '复杂数组',
			type: 'array',
			widget: 'drawerList',
			items: {
				type: 'object',
				properties: {
					input_ojGDEf: {
						title: '输入框',
						type: 'string',
						props: {},
					},
					textarea_NFlH0O: {
						title: '编辑框',
						type: 'string',
						format: 'textarea',
						props: {},
					},
					date_cEQbgV: {
						title: '日期选择',
						type: 'string',
						format: 'date',
					},
					checkbox_MMSJny: {
						title: '是否选择',
						type: 'boolean',
						widget: 'checkbox',
					},
					slider_sltYz_: {
						title: '带滑动条',
						type: 'number',
						widget: 'slider',
					},
				},
			},
			props: {},
		},
	},
	labelWidth: 120,
	displayType: 'row',
};

const Demo = () => {
	const form = useForm();
	const onFinish = (formData, errors) => {
		console.log('formData:', formData, 'errors', errors);
	};
	return (
		<div>
			<FormRender form={form} schema={schema} onFinish={onFinish} />
			<Button type="primary" onClick={form.submit}>
				提交
			</Button>
		</div>
	);
};

export default Demo;
