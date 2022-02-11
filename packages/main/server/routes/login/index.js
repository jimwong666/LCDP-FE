const express = require('express');

const router = express.Router();
const backend = require('../../backend');
const Session = require('../../session');

const logger = require('../../logger');

router.get('/', function (req, res) {
	res.render('login');
});

router.post('/', function (req, res) {
	const params = {
		userName: req.body.userName,
		password: req.body.password,
	};

	backend.post('/login', params, req, res, function (data) {
		logger.getLogger().info(`【登录】 | POST | req.body.userName | req.realIp | /web/login | ${JSON.stringify(data)}`);

		// TODO: 处理好登陆链接的 from 参数
		if (data && data.retCode === 0) {
			Session.logon(req, res, data);
			res.redirect('/');
		} else {
			res.locals.loginErrInfo.errorInfo = data && data.errorInfo;
			res.locals.loginErrInfo.userName = req.body && req.body.userName;
			res.render('login');
		}
	});
});

module.exports = router;
