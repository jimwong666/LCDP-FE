const numCPUs = require('os').cpus().length;
const config = require('./config').getConfig();

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	apps: [
		{
			name: 'app1',
			script: './bin/www',
			cwd: './',
			exec_mode: 'cluster',
			instances: isDev ? 1 : numCPUs >= 2 ? numCPUs : 2,
			error_file: `${config.logDist}/log/pm2/app-err.log`,
			out_file: `${config.logDist}/log/pm2/app-out.log`,
			env: {
				NODE_ENV: 'production',
				MICRO_CACHE: true,
			},
		},
	],
};
