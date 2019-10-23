# CleanFeet
## Introduction
CleanFeet is a plugin extension for [commitlint](https://github.com/conventional-changelog/commitlint), which is a tool for linting commit messages.

If you want to learn more about structured and convention-driven commit messages, see [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Rules
This plugin adds 2 rules:
+ `footer-format`: 
  + This rule determines the format a single footer line has to adhere to by allowing you to specify a set of regular expressions.
  + The rule passes in case there is no footer.
+ `footer-max-occurrence-breaking-change`:
  + This rule allows you to specify how many occurrences the footer can contain of `BREAKING CHANGE: <description>`. You're allowed to pass in your own regex `[2, 'always', [1, /^BREAKING CHANGE: .*$/]]`
  + The rule passes in case there is no footer.
  + Specifying `never` has no effect.

## Sample configuration
```js
module.exports = {
	plugins: ['cleanfeet'],
	extends: ['@commitlint/config-conventional'],
	rules: {
		'footer-format': [
			2, 
			'always', 
			[
				'^BREAKING CHANGE: .*',
				'^[a-zA-Z0-9-]+: .*',
				'^[a-zA-Z0-9-]+ #.*'
			]
		],
		'footer-max-occurrence-breaking-change': [2, 'always', 1]
	}
};
```

## Todo
+ Show which regular expression has been matched in case of specifying `never` for `footer-format`
+ Write tests
