const { clientPathResolve, getEntry, appConfig } = require('./utils/tools');

const entryObj = getEntry(clientPathResolve('src/entry'));
const dependencyPackages = appConfig.dependencyPackages || [];
module.exports = {
	entry: entryObj,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
					clientPathResolve('src'),
					...dependencyPackages.map(function (packages) {
						return clientPathResolve('../../' + packages);
					}),
					...dependencyPackages.map(function (packages) {
						return clientPathResolve('../node_modules/' + packages);
					}),
				],
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // 主要用于编译es6语法和react的jsx语法
					options: {
						cacheDirectory: true, // 开启缓存，提升速度
					},
				},
			},
		],
	},
	resolve: {
		modules: [clientPathResolve('src'), clientPathResolve('../node_modules'), 'node_modules'],
		extensions: ['.js', '.jsx', '.scss', '.json'],
		alias: {
			'@': clientPathResolve('src'),
			'@components': clientPathResolve('src/components'),
			'@material': clientPathResolve('src/material'),
			'@generator': clientPathResolve('src/generator'),
			'@renderer': clientPathResolve('src/renderer'),
			'@pages': clientPathResolve('src/pages'),
			'@styles': clientPathResolve('src/styles'),
			'@images': clientPathResolve('src/images'),
			'@utils': clientPathResolve('src/utils'),
			'@router': clientPathResolve('src/router'),
		},
	},
};
