const numCPUs = require('os').cpus().length;
const config = require('./config').getConfig();

module.exports = {
	apps: [
		{
			name: 'app1',
			script: './bin/www',
			cwd: './',
			exec_mode: 'cluster',
			instances: numCPUs >= 2 ? numCPUs : 2,
			error_file: `${config.logDist}/log/pm2/app-err.log`,
			out_file: `${config.logDist}/log/pm2/app-out.log`,
			env: {
				NODE_ENV: 'production',
				MICRO_CACHE: true,
			},
		},
	],
};
