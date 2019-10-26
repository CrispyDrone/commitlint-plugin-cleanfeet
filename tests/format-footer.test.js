import test from 'ava';
import footer_format from '../src/footer-format.js'

test('null footer should succeed', async t => {
    let result = footer_format({ footer: null }, 'always');
    t.true(result[0]);
});

test('empty footer should succeed', async t => {
    let result = footer_format({ footer: '' }, 'always');
    t.true(result[0]);
});

test('when always, no regexes specified should fail', async t => {
    let result = footer_format({ footer: 'commit message' }, 'always');
    t.false(result[0]);
});

test('when never, no regexes specified should succeed', async t => {
    let result = footer_format({ footer: 'commit message' }, 'never', []);
    t.true(result[0]);
});

test('when always, a line not matching any of the specified regexes should fail', async t => {
    let result = footer_format({ footer: 'commit message' }, 'always', ['^BREAKING CHANGE: This breaks stuff$']);
    t.false(result[0]);
});


test('when always, all lines matching any of the regexes should succeed', async t => {
    let result = footer_format(
	{ footer: 'BREAKING CHANGE: This breaks our previous api.\r\nReviewed-by: me\r\nIssue: #209' }, 
	'always', 
	[
	    '^BREAKING CHANGE: .+$',
	    '^[a-zA-Z-]+: .+$',
	    '^[a-zA-Z-]+ #.+$',
	]
    );
    t.true(result[0]);
});

test('when never, a line matching any of the specified regexes should fail', async t => {
    let result = footer_format(
	{ footer: 'BREAKING CHANGE: This breaks our previous api and fails this test.' }, 
	'never', 
	[
	    '^[a-zA-Z-]+: .+$',
	    '^BREAKING CHANGE: .+$',
	    '^[a-zA-Z-]+ #.+$',
	]
    );
    t.false(result[0]);
});

test('when never, no lines matching any of the regexes should succeed', async t => {
    let result = footer_format(
	{ footer: 'my non-conventional commit message' }, 
	'never', 
	[
	    '^[a-zA-Z-]+: .+$',
	    '^BREAKING CHANGE: .+$',
	    '^[a-zA-Z-]+ #.+$',
	]
    );
    t.true(result[0]);
});

test('value not specified, should fail', async t => {
    let result = footer_format(
	{ footer: 'my non-conventional commit message' }, 
	'always'
    );
    t.false(result[0]);
});

test('value not an array, should fail', async t => {
    let result = footer_format(
	{ footer: 'my non-conventional commit message' }, 
	'always',
	3
    );
    t.false(result[0]);
});
