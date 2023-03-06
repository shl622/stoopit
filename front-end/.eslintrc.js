module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:css/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:jest/recommended',
		'react-app',
		'prettier'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', 'css', 'jsx-a11y', 'jest'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/react-in-jsx-scope': 'off',
		'prefer-const': 'error',
		'no-unused-vars': 'error',
		'no-var': 'error',
		'react/prop-types': 'off'
	}
}
