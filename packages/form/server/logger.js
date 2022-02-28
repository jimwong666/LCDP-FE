/**
 * 日志模块
 *
 */
const log4js = require('log4js');
const conf = require('./utils/tools').appConfig;

const distPath = conf.logDist || 'log';
const isDevMode = process.env.NODE_ENV === 'development';

const appenders = {
	console: {
		type: 'console',
	},
};
const categories = {
	console: {
		appenders: ['console'],
		level: 'info',
	},
};

const params = ['access', 'default'];
for (const name of params) {
	appenders[name] = {
		type: 'file',
		filename: `${distPath}/${name}.log`,
		maxLogSize: 10485760,
		backups: 5,
	};
	categories[name] = {
		appenders: isDevMode ? [name, 'console'] : [name],
		level: 'info',
	};
}
log4js.configure({
	appenders,
	categories,
});

const loggers = {};

module.exports = {
	getLogger(category) {
		let logger = loggers[category];

		if (!logger) {
			const name = category || 'default';
			logger = log4js.getLogger(name);
			logger.info(`Logger "${name}" initialized.`);
			loggers[category] = logger;
		}
		return logger;
	},
};
