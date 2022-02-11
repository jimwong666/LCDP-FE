const fs = require('fs');
const path = require('path');
const config = require('../../../config');
/*
 * client 目录解析
 *
 * */
const clientPathResolve = (relativePath) => {
	return path.resolve(__dirname, '../../', relativePath);
};

/**
 * get package.json version（废弃，自建了配置文件，还是不要放在package.json里面）
 */
// function getPackageConfig(){
//     const pkgPath = clientPathResolve('../package.json');
//     const pkgData = JSON.parse(fs.readFileSync(pkgPath));
//     return pkgData.webpackConfig;
// }

/**
 * get entry files
 * @param {String} entryDir：entry文件目录路径
 */
function getEntry(entryDir) {
	const entryMap = {};

	const getFile = function (pageDir) {
		fs.readdirSync(pageDir).forEach((pathname) => {
			const fullPathName = path.resolve(pageDir, pathname);
			const stat = fs.statSync(fullPathName);
			if (stat.isDirectory()) {
				getFile(fullPathName);
			}
			if (stat.isFile()) {
				const arr = fullPathName.split('.');
				arr.pop();
				const tar = arr.join('.');
				let relTar = path.relative(entryDir, tar);
				relTar = relTar.replace(/\\/g, '/');
				// entryMap[rel_tar] = ['@babel/polyfill', fullPathName.replace(/\\/g, '/')];
				entryMap[relTar] = fullPathName.replace(/\\/g, '/');
			}
		});
	};
	getFile(entryDir);
	return entryMap;
}

module.exports = {
	clientPathResolve,
	appConfig: config.getConfig(),
	getEntry,
};
