module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
	},
	parser: 'babel-eslint', // 支持babel新语法
	parserOptions: {
		ecmaVersion: 2019, // es版本
		ecmaFeatures: {
			legacyDecorators: true,
		},
		sourceType: 'module', // js模块化
	},
	extends: [
		'eslint:recommended',
		// airbnb
		'airbnb',
		// prettier
		'plugin:markdown/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:markdown/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react-redux/recommended',
		'plugin:json/recommended',
		'plugin:prettier/recommended',
	],
	plugins: [
		// eslint-config-prettier (禁用eslint中与prettier冲突的配置)
		'import',
		'markdown',
		'prettier',
		'jsx-a11y',
		'react',
		'react-hooks',
		'react-redux',
		'json',
	],
	rules: {
		// eslint-plugin-prettier 配置 （prettier读取eslint中的配置）
		'prettier/prettier': [
			'error',
			// prettier 规则配置
			{
				endOfLine: 'auto', // 换行cr检查
				singleQuote: true, // 启动单引号
				semi: true, // 语句结尾无分号
			},
		],
		// airbnb
		'import/no-unresolved': 'off', // 引入模块路径检查（vue难以解析路径）
		'import/extensions': 'off', // import文件不加后缀检查
		'import/no-extraneous-dependencies': 'off', // 无外来依赖检查（要求只能用npm依赖，导致无法使用cdn）
		'import/prefer-default-export': 'off', // 优先使用export default
		// react
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 0,
		// react-redux
		'react-redux/connect-prefer-named-arguments': 2,
		// eslint
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产时无console语句
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产时无debugger关键字
		'no-shadow': 'off', // 同文件重复引用校验
		'linebreak-style': 'off', // 换行检查
		'func-names': 'off', // 函数必须命名（导致匿名函数无法使用）
		'no-restricted-syntax': 'off', // 禁用特定语法（导致一些语法无法使用：for of）
		'no-use-before-define': [
			'error',
			{
				// 函数必须先定义后使用
				functions: false,
			},
		],
		'no-plusplus': 'off', // 禁用 ++ --
		'no-continue': 'off', // 禁用 continue
		'no-param-reassign': 'off', // 禁止函数的参数重写赋值
		'class-methods-use-this': 'off', // class中的方法必须使用this
		'no-unused-expressions': 'off',
		// import
		'no-dynamic-require': 0,
	},
	globals: {
		// 全局忽略
		BASE_URL: true,
	},
};
