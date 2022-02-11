export default {
	disableTypeCheck: true,
	cjs: {
		type: 'babel',
		lazy: true,
	},
	esm: {
		type: 'babel',
		importLibToEs: true,
	},
	umd: {
		name: 'aeps-rc',
		minFile: true,
		sourcemap: true,
		globals: {
			react: 'React',
			antd: 'antd',
			'react-router-dom': 'react-router-dom',
		},
	},
	extraBabelPlugins: [
		[
			'babel-plugin-import',
			{
				libraryName: 'antd',
				style: true,
			},
			'antd',
		],
	],
	extractCSS: true,
	lessInBabelMode: true,
};
