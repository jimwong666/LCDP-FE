const extend = require('extend');
const uuid = require('uuid');

const crypto = require('./crypto');
const logger = require('../logger');
const Constants = require('../constants');

const Session = function () {};

extend(Session, {
	logon(req, res, logon) {
		const COOKIE_DOMAIN = req.locals.app.mainAppDomain;
		const opts = { domain: COOKIE_DOMAIN, httpOnly: false, maxAge: Constants.COOKIE_MAX_AGE, sameSite: false };
		const current = Session.get(req, res);
		const session = {
			id: current.id,
			userIdEnc: logon.userIdEnc,
			loginName: logon.loginName,
			userName: logon.userName,
			gender: logon.gender,
			telephone: logon.telephone,
			email: logon.email,
			info: logon.info,
			status: logon.status, // 近期1天/1周/1个月/3个月/半年/1年活动
			xToken: logon.xToken, // 大后端给的
		};
		res.cookie('session', crypto.encrypt(JSON.stringify(session), req.pid), opts);
		res.cookie('xToken', logon.xToken, opts);
	},
	/**
	 * 调用远程认证服务创建会话
	 * TODO: 账号互通
	 * @param req
	 * @param res
	 * @param callback
	 */
	// create(req, res, callback) {},
	/**
	 * 获取会话内容
	 *
	 * @param req
	 * @param res
	 */
	get(req, res) {
		const COOKIE_DOMAIN = req.locals.app.mainAppDomain;

		// logger.getLogger().info(req.hasOwnProperty('cookies'), req.cookies.session, 'Cookie, Session');
		const token = Object.prototype.hasOwnProperty.call(req, 'cookies') ? req.cookies.session : null;
		let ret = {};
		if (token) {
			try {
				ret = JSON.parse(crypto.decrypt(token, req.pid));
			} catch (e) {
				this.destroy(req, res);
				logger.getLogger().error(`Invalid session token: ${token}\n${e}`);
			}
		} else {
			const opts = { domain: COOKIE_DOMAIN, httpOnly: false, maxAge: Constants.COOKIE_MAX_AGE, sameSite: false };
			const session = {
				id: uuid.v4(),
			};

			// 创建未认证的会话
			res.cookie('session', crypto.encrypt(JSON.stringify(session), req.pid), opts);
			ret = session;
		}
		return ret;
	},
	set(req, res, hash) {
		const COOKIE_DOMAIN = req.locals.app.mainAppDomain;

		let session = Session.get(req, res) || {};
		const opts = { domain: COOKIE_DOMAIN, httpOnly: false, maxAge: Constants.COOKIE_MAX_AGE, sameSite: false };

		session = extend(session, hash);
		res.cookie('session', crypto.encrypt(JSON.stringify(session), req.pid), opts);

		return session;
	},
	/**
	 * 销毁会话
	 *
	 * @param req
	 * @param res
	 */
	destroy(req, res) {
		const COOKIE_DOMAIN = req.locals.app.mainAppDomain;
		const opts = {
			domain: COOKIE_DOMAIN,
			expires: new Date(1),
			httpOnly: false,
			sameSite: false,
		};

		res.cookie('session', '', opts);
		res.cookie('xToken', '', opts);
	},
});
module.exports = Session;
