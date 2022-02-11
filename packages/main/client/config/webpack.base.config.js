const HtmlWebpackPlugin = require('html-webpack-plugin');
const { clientPathResolve, appConfig, getEntry } = require('./utils/tools');

const entryObj = getEntry(clientPathResolve('src/entry'));
module.exports = {
	entry: entryObj,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [clientPathResolve('src'), clientPathResolve('../../aeps-rc')],
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
	plugins: [].concat(
		Object.keys(entryObj).map((chunkName) => {
			// 多页面兼容
			return new HtmlWebpackPlugin({
				title: appConfig.appName,
				filename: `${chunkName}.html`,
				chunks: [chunkName],
				template: clientPathResolve('public/index.ejs'),
				favicon: clientPathResolve('public/favicon.ico'), // 其实node那边处理过了
				templateParameters: {
					MICRO_APPS: JSON.stringify(appConfig.microApps),
				},
			});
		}),
	),
};
