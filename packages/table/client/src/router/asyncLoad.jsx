import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
	return <>加载中...</>;
};

const asyncLoad = (importComponent) => {
	return Loadable({
		loader: importComponent,
		loading: Loading,
	});
};

export default asyncLoad;
