const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { clientPathResolve, appConfig } = require('./utils/tools');
// const { rewrites, openPage } = require('./utils/devMultiPageTools');
const { rewrites } = require('./utils/devMultiPageTools');

// const entryObj = getEntry(clientPathResolve('src/entry'));
const port = appConfig.dev_clientPort || 3000;
const publicPath = appConfig.dev_publicPath || '/';
const devApiPath = appConfig.dev_apiPath || `http://localhost:${port}/`;

module.exports = merge(webpackBaseConfig, {
	output: {
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
		publicPath,
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		port,
		compress: true,
		disableHostCheck: true,
		host: '0.0.0.0',
		hot: true,
		// open: true,
		// openPage,
		historyApiFallback: {
			rewrites,
		},
	},
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				include: [clientPathResolve('../../aeps-rc'), /node_modules/],
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				include: [
					clientPathResolve('src'),
					clientPathResolve('../node_modules/aeps-rc'),
					clientPathResolve('../../aeps-rc'),
				],
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			},
		],
	},
	plugins: [
		new ReactRefreshPlugin(),
		new webpack.DefinePlugin({
			// 所有ajax请求的基础url
			BASE_URL: JSON.stringify(`${devApiPath}`),
		}),
	],
});
