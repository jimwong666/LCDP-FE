import React from 'react';
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
		<div style={{ height: '1000px' }}>
			<Generator defaultValue={defaultValue} />
		</div>
	);
};

export default Demo;
