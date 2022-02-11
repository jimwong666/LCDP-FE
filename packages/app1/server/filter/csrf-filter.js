/**
 *
 * 判断链接是否通过Token校验
 */

// const Session = require('../session');
const Constants = require('../constants');
const tools = require('../utils/tools');

module.exports = {
	filter(req, res, next) {
		if (req.locals.app.skipCERFFilter) {
			// 本站请求，跳过csrf
			return next();
		}

		const matchWhitelist = tools.MatchSome(req.url, Constants.CSRF_WHITE_LIST);
		// const session = Session.get(req, res);
		const xToken = req.header('xToken') || req.body.xToken || req.query.xToken;
		const check = function (token) {
			// TODO: 后续需要优化这一块
			return !!token;
		};

		if (req.method === 'GET' && (matchWhitelist || check(xToken))) {
			// 请求是get 并且 (匹配csrf白名单 或者 xToken通过验证)
			return next();
		}
		return next({
			retCode: 403,
			stack: 'Forbidden',
			message: '禁止访问！',
		});
	},
};
