const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackBaseConfig = require('./webpack.base.config');
const { clientPathResolve, appConfig } = require('./utils/tools');

// const entryObj = getEntry(clientPathResolve('src/entry'));

const publicPath = appConfig.publicPath || '//scmstatic.abiz.com/';
const apiPath = appConfig.apiPath || '//scm.abiz.com/';

module.exports = merge(webpackBaseConfig, {
	output: {
		filename: 'js/[name].[chunkhash:8].js',
		chunkFilename: 'js/[name].[chunkhash:8].js',
		path: clientPathResolve('../dist'),
		publicPath,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: [clientPathResolve('src')],
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../', // css中引入背景图片会在图片url前面加上该路径
						},
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2, // 使用import之前还要经过几次loader
							modules: {
								localIdentName: `${appConfig.appName}__[local]--[hash:base64:5]`,
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: path.resolve(__dirname, './postcss.config.js'), // 使用postcss单独的配置文件
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(less|css)$/,
				include: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../', // css中引入背景图片会在图片url前面加上该路径
						},
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
				include: [clientPathResolve('src')],
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						outputPath: 'images/',
						name: '[name].[hash:8].[ext]',
					},
				},
			},
		],
	},
	plugins: [
		// 清除dist目录文件
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: clientPathResolve('../dist/**/*'),
		}),
		// 提取css为单独css文件
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
		splitChunks: {
			chunks: 'all',
			// minSize: 30000,
			// maxSize: 0,
			// minChunks: 1,
			// maxAsyncRequests: 5,
			// maxInitialRequests: 3,
			// automaticNameDelimiter: '~',
			// name: true,
			cacheGroups: {
				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial', // 只打包初始时依赖的第三方
					priority: 10,
				},
				antd: {
					name: 'antd',
					test: /[\\/]node_modules[\\/]antd[\\/]/,
					priority: 20,
				},
				commons: {
					name: 'commons',
					test: clientPathResolve('src'), // 可自定义拓展你的规则
					minChunks: 2, // 最小共用次数
					priority: 5,
					reuseExistingChunk: true,
				},
			},
		},
		minimizer: [
			new UglifyJsPlugin({
				cache: true, // 启用文件缓存
				parallel: true, // 启用多进程
				uglifyOptions: {
					compress: {
						drop_console: true, // 删除所有的console
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
			new webpack.DefinePlugin({
				// 所有ajax请求的基础url
				BASE_URL: JSON.stringify(`${apiPath}`),
			}),
		],
	},
});
