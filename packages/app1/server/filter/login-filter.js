/**
 *
 * 判断链接是否需要登录
 */

const Session = require('../session');
const Constants = require('../constants');
const tools = require('../utils/tools');

// 已登录，访问 /login，直接到首页
const loginUrlReg = /^\/(login)/;

module.exports = {
	filter(req, res, next) {
		if (req.locals.app.skipLoginFilter) {
			// 跳过本次中间件
			return next();
		}

		const matchWhitelist = tools.MatchSome(req.url, Constants.LOGIN_WHITE_LIST);
		const session = Session.get(req, res);
		// const logged = session && session.userIdEnc;
		const logged = (session && session.userIdEnc) || (req.headers && req.headers['x-token']);
		const { host } = req.headers;

		// if (req.locals.app.domainUrl !== `${req.protocol}://${host}`) {
		// 外部调用
		if (
			(!!req.headers.origin && req.headers.origin.indexOf(req.locals.app.mainAppDomain) === -1) ||
			req.locals.app.domainUrl !== `${req.protocol}://${host}`
		) {
			return next();
		}

		// 内部调用
		req.locals.app.skipCERFFilter = true;

		// 已登录
		if (logged) {
			if (loginUrlReg.test(req.url)) {
				return res.redirect('/');
			}
			return next();
		}

		// 未登录
		if (matchWhitelist) {
			return next();
		}

		if (req.xhr) {
			// 异步请求
			return next({
				retCode: 401,
				stack: 'unauthorized',
				message: '未授权！',
			});
		}
		const fromPos = req.url.indexOf('?');
		if (fromPos === -1) {
			const redirectUrl = req.url === '/' ? '/login' : `/login?from=${encodeURIComponent(req.url)}`;
			return res.redirect(redirectUrl);
		}
		return res.redirect(`/login?from=${encodeURIComponent(req.url.slice(0, fromPos))}&${req.url.slice(fromPos + 1)}`);
	},
};
