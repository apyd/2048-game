module.exports = {
	env: {
		es6: true,
		browser: true
	},
	extends: [
		'airbnb-base'
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'eol-last': 0,
		'import/extensions': 0,
		'lines-between-class-members': ['error', 'always', {
			exceptAfterSingleLine: true
		}],
		'no-param-reassign': ['error', {
			props: false
		}],
		'comma-dangle': ['error', {
			arrays: 'never',
			objects: 'never',
			imports: 'never',
			exports: 'never',
			functions: 'never'
		}],
		'max-len': ['error', {
			code: 125,
			ignoreTemplateLiterals: true
		}],
		'prefer-exponentiation-operator': 0,
		'object-curly-newline': ['error', {
			ImportDeclaration: 'never',
			ExportDeclaration: {
				multiline: true
			}
		}],
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }]
	}
};