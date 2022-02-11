const logger = require('./logger');

module.exports = {
	notFound(req, res, next) {
		const errData = {
			retCode: 404,
			stack: 'not found',
			message: '服务器找不到请求的网页！',
		};
		next(errData);
	},
	handler(err, req, res) {
		const errData = {
			retCode: err.retCode || 500,
			stack: err.stack || 'server errors',
			message: err.message || '服务器内部错误！',
		};
		logger.getLogger().error(`${errData.retCode} | Request failed: "${req.url}"`, '\n', errData.stack);

		if (req.xhr) {
			res.status(err.retCode || 500).send(errData);
		} else {
			res.status(err.retCode || 500).render('error', errData);
		}
	},
};
