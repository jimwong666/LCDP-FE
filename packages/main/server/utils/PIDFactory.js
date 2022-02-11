const Moment = require('moment');
const { Buffer } = require('buffer/');
const Constants = require('../constants');

const generatePID = function (req) {
	const date = new Moment(new Date()).format('YYYYMMDDHHmmssSSS');
	const ip = req.realIp;
	const random = Math.ceil(Math.random() * 100000000);
	let str;

	[str] = Buffer.from(ip + date + random)
		.toString('base64')
		.split('=');
	str = str.slice(27) + str.substr(0, 27);
	return str;
};

module.exports = {
	createPID(req, res) {
		const COOKIE_DOMAIN = req.headers.host;
		let { pid } = req.cookies;
		if (!pid) {
			pid = generatePID(req);
			res.cookie('pid', pid, {
				domain: COOKIE_DOMAIN,
				httpOnly: true,
				maxAge: Constants.COOKIE_MAX_AGE,
				sameSite: 'Lax',
			});
		}

		return pid;
	},
};
