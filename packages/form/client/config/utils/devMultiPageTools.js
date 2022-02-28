const { clientPathResolve, appConfig, getEntry } = require('./tools');

const entryObj = getEntry(clientPathResolve('src/entry'));
const port = appConfig.dev_clientPort || 3000;

// 开发环境，单页应用刷新页面重定向到对应的单页目录下，以便支持多个单页和多页共存
// 多页应用时，最好在 react-router 的路由路径前加一层，区分不同页面，比如：/index/xxx... 和 /index2/xxx...，做一下设配
// 注意：这里没有考虑 entry 文件夹内存在嵌套现象，如：group1/index1, group2/index1
const rewrites = function () {
	return Object.keys(entryObj).map((chunkName) => ({
		from: new RegExp(`^/${chunkName}`),
		to: `/${chunkName}.html`,
	}));
};

// 开发环境自动打开的url
const openPage = `http://localhost:${port}/`;

module.exports = {
	rewrites: rewrites(),
	openPage,
};
