const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { clientPathResolve, appConfig, getEntry } = require('./utils/tools');
// const { rewrites, openPage } = require('./utils/devMultiPageTools');
const { rewrites } = require('./utils/devMultiPageTools');

const entryObj = getEntry(clientPathResolve('src/entry'));
const port = appConfig.dev_clientPort || 3000;
const publicPath = appConfig.dev_publicPath || '/';
const devApiPath = appConfig.dev_apiPath || `http://localhost:${port}/`;

module.exports = merge(webpackBaseConfig, {
	output: {
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
		publicPath, // 运行 qiankun 时，改用了运行时 publicPath，请查看 src/public-path.js
		library: `${appConfig.appName}-[name]`,
		libraryTarget: 'umd',
		chunkLoadingGlobal: `chunkLoadingGlobal_${appConfig.appName}`,
	},
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		port,
		compress: true,
		allowedHosts: 'all',
		host: '0.0.0.0',
		hot: true,
		// open: true,
		// openPage,
		headers: {
			'Access-Control-Allow-Origin': appConfig.dev_mainAppDomainUrl,
			'Access-Control-Allow-Credentials': 'true',
		},
		historyApiFallback: {
			rewrites,
		},
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: [clientPathResolve('src')],
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: `${appConfig.appName}__[local]--[hash:base64:5]`,
							},
							importLoaders: 2, // 使用import之前还要经过几次loader
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								config: path.resolve(__dirname, './postcss.config.js'), // 使用postcss单独的配置文件
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
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
							lessOptions: {
								javascriptEnabled: true,
							},
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
				exclude: /node_modules/,
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
	].concat(
		Object.keys(entryObj).map((chunkName) => {
			return new HtmlWebpackPlugin({
				title: appConfig.appName,
				filename: `${chunkName}.html`,
				chunks: [chunkName],
				template: clientPathResolve('public/index.ejs'),
				favicon: clientPathResolve('public/favicon.ico'), // 其实node那边处理过了
				templateParameters: {
					APP_NAME: appConfig.appName,
					PUBLIC_PATH: publicPath,
				},
			});
		}),
	),
});
