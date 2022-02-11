/**
 * 把其他文件下的 markdown 文件复制到 docs-source 下面
 * wj
 * */

const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');

// 注意：此处会删除 docs-sources 目录下的文件夹！！！！！以达到清理的目的
const delDr = function (dir) {
	if (!fs.existsSync(dir)) return;
	const recursion = function (dir) {
		const list = fs.readdirSync(dir);
		list.forEach(function (file) {
			const stat = fs.statSync(dir + '/' + file);
			if (stat && stat.isDirectory()) {
				recursion(dir + '/' + file);
			} else {
				fs.unlinkSync(dir + '/' + file);
			}
		});
		fs.rmdirSync(dir);
	};
	recursion(dir);
};

const getDir = function () {
	let fromFilePath = [],
		toFilePath = [];
	// 递归查找文件夹下的目标文件
	const recursion = function (dir) {
		// dirArr.forEach(function(dir){
		const list = fs.readdirSync(dir);
		list.forEach(function (file) {
			if (file === 'static' || file === 'node_modules') {
				return false;
			}
			const filePath = dir + '/' + file,
				stat = fs.statSync(filePath);

			if (stat && stat.isDirectory()) {
				recursion(filePath);
			} else {
				if (path.extname(filePath) === '.md') {
					const resultPath = path.resolve(__dirname, filePath);
					fromFilePath.push(resultPath.replace(/\\/g, '/'));
					toFilePath.push(resultPath.replace('packages', 'docs-sources').replace('\\src', '').replace(/\\/g, '/'));
				}
			}
		});
	};
	recursion('./packages');
	fromFilePath.push(path.resolve(__dirname, './README.md'), path.resolve(__dirname, './README.zh-CN.md'));
	toFilePath.push(
		path.resolve(__dirname, './docs-sources/README.md'),
		path.resolve(__dirname, './docs-sources/README.zh-CN.md'),
	);
	return [fromFilePath, toFilePath];
};

const copyFile = function (fromFile, toFile) {
	for (let index in fromFile) {
		const fromFileDir = fromFile[index],
			toFileDir = toFile[index];

		// 查找toFileDir路径下的文件夹，没有就创建
		for (let i = 1; i < toFileDir.split('/').length; i++) {
			fs.existsSync(toFileDir.split('/', i).join('/')) || fs.mkdirSync(toFileDir.split('/', i).join('/'));
		}
		const rs = fs.createReadStream(fromFileDir, {
			autoClose: true,
			encoding: 'utf-8',
			highWaterMark: 64 * 1024 * 1024,
			flags: 'r',
		});

		// 创建自定义转换流的类
		class MyTransform extends Transform {
			_transform(chunk, encoding, callback) {
				// 根目录的readme.md
				if (fromFileDir.indexOf('\\README.md') > 0) {
					chunk = Buffer.from(chunk.toString().replace('English | [简体中文](./README.zh-CN.md)', ''));
					this.push(
						`---
title: A doc about this SSSS
hero:
  title: SSSS
  desc: 📖 A doc about this SSSS
footer: 😊😁😎😉😜🤞✌
---
` + chunk,
					);
				}
				// 根目录的readme.zh-CN.md
				else if (fromFileDir.indexOf('\\README.zh-CN.md') > 0) {
					chunk = Buffer.from(chunk.toString().replace('简体中文 | [English](./README.md)', ''));
					this.push(
						`---
title: 关于SSSS的项目文档
hero:
  title: SSSS
  desc: 📖 关于SSSS的项目文档
footer: 😊😁😎😉😜🤞✌
---
` + chunk,
					);
				} else {
					this.push(chunk);
				}

				callback();
			}
		}

		const ws = fs.createWriteStream(toFileDir, {
			encoding: 'utf-8',
			flags: 'a',
			highWaterMark: 16 * 1024 * 1024,
			autoClose: true,
		});
		rs.pipe(new MyTransform()).pipe(ws);
	}
};

delDr('./docs-sources');
copyFile(...getDir());
