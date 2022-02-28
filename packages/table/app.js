/**
 * app
 */
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const log4js = require('log4js');
const history = require('connect-history-api-fallback');

const express = require('express');
require('express-async-errors'); // 捕获异步函数错误
const errors = require('./server/errors');
const logger = require('./server/logger');
const conf = require('./server/utils/tools').appConfig;
const routerRigister = require('./server/route');

const globalFilter = require('./server/filter/global-filter');
const loginFilter = require('./server/filter/login-filter');
const csrfFilter = require('./server/filter/csrf-filter');

const app = express();

app.set('trust proxy', true);
app.set('port', process.env.PORT || conf.serverPort);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(
	log4js.connectLogger(logger.getLogger('access'), {
		level: log4js.levels.INFO,
		format:
			'[:remote-addr :method :url :status :response-timems :content-length][:referrer HTTP/:http-version :user-agent]',
		nolog: /.+(\.(js|css|img|ico|png|jpg|gif|txt))$/,
	}),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 允许跨域
app.all('*', function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', conf.mainAppDomainUrl);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-token',
	);
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('X-Powered-By', ' 3.2.1');
	if (req.method === 'OPTIONS') res.send(200);
	else next(); // 让options请求快速返回
});

app.use(cookieParser());
// static
app.use(
	'/public',
	express.static(path.join(__dirname, 'public'), {
		cacheControl: false,
	}),
);

// filter
app.use((req, res, next) => globalFilter.filter(req, res, next));
app.use((req, res, next) => loginFilter.filter(req, res, next));
app.use((req, res, next) => csrfFilter.filter(req, res, next));

// router
routerRigister.route(app);

// fe
app.use(
	history({
		index: '/dist/index.html',
		// 多页面 支持
		// rewrites: [
		//     { from: /\/xxx/, to: '/xxxx.html'}
		// ]
	}),
);

// static
app.use(
	'/dist',
	express.static(path.join(__dirname, 'dist'), {
		cacheControl: false,
	}),
);

// error
app.use((req, res, next) => errors.notFound(req, res, next));
app.use((err, req, res, next) => errors.handler(err, req, res, next));

module.exports = app;
