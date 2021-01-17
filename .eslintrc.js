module.exports = {
	env: {
		es6: true,
		browser: true,
	},
	extends: [
		'airbnb-base',
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'eol-last': 0,
		'import/extensions': 0,
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
	},
};