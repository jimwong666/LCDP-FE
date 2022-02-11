/**
 * Automatic Routing Module
 *
 * This module reads routing configuration from filesystem and register endpoint to Express app.
 *
 * @author qiumingsheng
 */

const walk = require('walk');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');
// const isDevMode = process.env.NODE_ENV === 'development';

/**
 * Register routing group
 *
 * @param app
 * @param routes
 * @param key
 */

function readFileProcessor(app, root, fileStats) {
	const endpointGroup = fileStats.name.match(/(.+)\.js$/);
	const parentGroup = root.match(new RegExp('routes(.*)'));
	if (endpointGroup && endpointGroup.length > 0 && parentGroup.length > 0) {
		let filePath = root.replace(/\\/gi, '/');
		// var filePath = isDevMode ? root.replace(/\\/gi, '/') : root;
		filePath = `${filePath}/${fileStats.name}`;
		let data = '';

		try {
			data = fs.readFileSync(filePath, 'utf8');
		} catch (e) {
			logger.getLogger().error(`readFileSync error:${e}`);
		}
		if (data !== '') {
			const endpoint = endpointGroup[1] === 'index' ? '' : endpointGroup[1];
			const parent = parentGroup[1] + (endpoint ? '/' : '');
			let key = (parent + endpoint).replace(/\\/gi, '/');
			// var key = isDevMode ? (parent + endpoint).replace(/\\/gi, '/') : (parent + endpoint);
			key = key || '/';

			/* eslint-disable */
			const router = require(filePath);
			if (router) {
				app.use(key, router);
			} else {
				logger.getLogger().warn(`No routes found in "${key}".`);
			}
			/* eslint-enable */
		}
	}
}

/**
 * @param app
 */
exports.route = function (app) {
	// Walker options
	const options = {
		listeners: {
			file(root, fileStats, next) {
				readFileProcessor(app, root, fileStats);
				next();
			},
			errors(root, nodeStatsArray, next) {
				if (nodeStatsArray.error) {
					logger.getLogger().error(`register failure:${JSON.stringify(nodeStatsArray)}`);
				}
				next();
			},
		},
	};
	walk.walkSync(path.resolve(__dirname, './routes'), options);
};
