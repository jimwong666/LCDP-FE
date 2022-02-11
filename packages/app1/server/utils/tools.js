const config = require('../../config');

// QueryString
const QueryString = function (str) {
	const result = str.match(/[?&][^?&]+=[^?&]+/g);

	if (result) {
		const keys = [];
		const params = {};

		for (let i = 0; i < result.length; i++) {
			const s = result[i].substring(1);
			const kv = s.match(/(.*)=(.*)/);
			if (kv) {
				keys.push(kv[1]);
				[, , params[kv[1]]] = kv;
			}
		}
		this.keys = keys;
		this.params = params;
	}
};
QueryString.prototype = {
	toString() {
		let ret = '';
		for (const i in this.keys) {
			if (!Object.prototype.hasOwnProperty.call(this.keys, i)) continue;
			const key = this.keys[i];
			const value = this.params[key];
			ret += `${key}=${value}`;
			if (i < this.keys.length - 1) {
				ret += '&';
			}
		}

		return ret;
	},
	set(key, value) {
		let pos = -1;
		for (const i in this.keys) {
			if (this.keys[i] === key) {
				pos = i;
			}
		}

		if (pos < 0) {
			this.keys.push(key);
		}

		this.params[key] = value;
	},
	get(key) {
		return this.params[key];
	},
};

// MatchSome
const MatchSome = function (url, list) {
	return list.some(function (regex) {
		return regex.test(url);
	});
};

const Serialize = function (params) {
	let ret = '';
	if (params) {
		const keys = Object.keys(params);

		keys.forEach(function (key, index) {
			let value = params[key];
			if (value === undefined) {
				value = '';
			}

			ret += `${key}=${value}`;

			if (index < keys.length - 1) {
				ret += '&';
			}
		});
	}
	return ret;
};

// GetAppConfig （废弃，自建了配置文件，还是不要放在package.json里面）
// const GetAppConfig = function() {
//     const filePath = path.resolve(__dirname, '../../package.json');
//     const serverData = JSON.parse(fs.readFileSync(filePath));
//     return serverData;
// }

module.exports = {
	Serialize,
	QueryString,
	MatchSome,
	appConfig: config.getConfig(),
};
