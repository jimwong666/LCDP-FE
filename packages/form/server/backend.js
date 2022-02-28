const http = require('http');
const request = require('request');
const async = require('async');
const extend = require('extend');

const logger = require('./logger');
const ParamExtender = require('./utils/ParamExtender');
const tools = require('./utils/tools');

const conf = require('./utils/tools').appConfig;

const isDevMode = process.env.NODE_ENV === 'development';

function doRequest(method, uri, params, callback) {
	let headers = {
		Connection: 'close',
		'Content-Type': 'application/x-www-form-urlencoded',
	};
	let form = { ...params };
	const queryString = method === 'get' ? tools.Serialize(form) : '';
	const base = isDevMode ? conf.dev_backendUrl : conf.backendUrl;
	uri = !/^http(s)?:\/\/(.*)$/.test(uri) ? base + uri : uri;
	form = form.array || form;

	if (form.headers) {
		headers = extend(headers, form.headers);
		delete form.headers;
	}

	uri += queryString ? (uri.indexOf('?') === -1 ? '?' : '&') + queryString : '';

	isDevMode && console.log('toBackendUrl:', uri);

	const options = {
		url: uri,
		method: method.toUpperCase(),
		timeout: uri.indexOf('/excel') !== -1 ? conf.fileSocketTimeout || conf.socketTimeout : conf.socketTimeout,
		headers,
	};

	if (method === 'post' || method === 'put' || method === 'delete') {
		if (/^application\/json/.test(options.headers['Content-Type'])) {
			options.json = form;
		} else if (/^multipart\/form-data/.test(options.headers['Content-Type'])) {
			options.formData = form;
		} else if (form.postData) {
			options.form = form.postData;
		} else {
			options.form = form;
		}
	}

	const req = request(options, function (err, res, body) {
		if (err) {
			logger.getLogger().error(err);
		} else if (typeof body !== 'undefined') {
			let json = {};
			if (typeof body === 'string') {
				if (res.headers && res.headers['content-type'] === 'application/octet-stream') {
					json = body;
				} else {
					try {
						json = JSON.parse(body);
					} catch (e) {
						logger
							.getLogger()
							.error(`Error occurred when accessing backend "${uri}", response content is:\n${body}`, e);
					}
				}
			} else {
				json = body;
			}
			callback(null, json);
		}
	});
	req.once('error', function (e) {
		callback(e);
	});
}
/**
 * 解析参数
 *
 * @returns {{method: *, uri: string, params: {}, callback: callback}}
 */
function parseArguments(...args) {
	let uri = '';
	let params = {};
	let req;
	let res;
	let callback = function () {};

	for (const arg of args) {
		switch (typeof arg) {
			case 'string':
				uri = arg;
				break;
			case 'object':
				if (arg instanceof http.IncomingMessage) {
					req = arg;
				} else if (arg instanceof http.ServerResponse) {
					res = arg;
				} else {
					params = arg;
				}
				break;
			case 'function':
				callback = arg;
				break;
			default:
				logger.getLogger().error(`parseArguments params error!`);
		}
	}
	if (uri) {
		params = ParamExtender.wrapIdentify(params, req, res);
	} else {
		params.map(function (task) {
			return ParamExtender.wrapIdentify(task.params, req, res);
		});
	}
	return { uri, params, callback };
}

function execute(method, uri, params, callback) {
	if (uri) {
		doRequest(method, uri, params, function (err, data) {
			callback(data);
		});
	} else if (params.length !== undefined) {
		// array
		const tasks = [];
		const errors = [];

		params.forEach(function (task) {
			const { uri } = task;
			const requestParams = task.params;
			tasks.push(function (done) {
				method = task.method || method;
				doRequest(method, uri, requestParams, function (err, data) {
					if (err) {
						errors.push(`Running task "${task.uri}" failed - ${err.toString()}`);
					} else {
						task.task(data);
					}
					done();
				});
			});
		});

		async.parallel(tasks, function () {
			if (errors && errors.length > 0) {
				throw errors[0];
			} else {
				callback();
			}
		});
	}
}
module.exports = {
	get(...arg) {
		const args = parseArguments.apply(this, arg);
		execute('get', args.uri, args.params, args.callback);
	},
	post(...arg) {
		const args = parseArguments.apply(this, arg);
		execute('post', args.uri, args.params, args.callback);
	},
	put(...arg) {
		const args = parseArguments.apply(this, arg);
		execute('put', args.uri, args.params, args.callback);
	},
	delete(...arg) {
		const args = parseArguments.apply(this, arg);
		execute('delete', args.uri, args.params, args.callback);
	},
	download(uri, params, req, res) {
		params = ParamExtender.wrapIdentify(params, req, res);

		const base = isDevMode ? conf.dev_backendUrl : conf.backendUrl;
		if (!/^http(s)?:\/\/(.*)$/.test(uri)) {
			uri = base + uri;
		}
		const method = (params.method && params.method.toUpperCase()) || 'GET';

		const form = { ...params };
		let headers = {
			Connection: 'close',
			'Content-Type': 'application/json',
		};
		if (form.headers) {
			headers = extend(headers, form.headers);
			delete form.headers;
		}

		if (params.ignoreHead) {
			delete headers['X-ClientVersion'];
			delete headers['X-ClientType'];
		}
		let queryString = '';
		if (method === 'GET') {
			queryString = tools.Serialize(form);
			uri += queryString ? (uri.indexOf('?') === -1 ? '?' : '&') + queryString : '';
		}
		delete form.method;

		const options = {
			url: uri,
			method: method.toUpperCase(),
			timeout: conf.fileSocketTimeout || conf.socketTimeout,
			headers,
		};
		if (method === 'POST') {
			options.json = form;
		}

		options.url = uri;
		return request(options);
	},
};
