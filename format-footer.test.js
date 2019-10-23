import test from 'ava';
import { rules } from './index.js'

test('when always, no regexes specified should fail', async t => {
    let footer_format = rules['footer-format'];
    let result = footer_format({ footer: "hello" }, 'always');
    t.false(result[0]);
});

test.skip('when never, no regexes specified should succeed', async t => {
});

test.skip('when always, a line not matching any of the specified regexes should fail', async t => {
});


test.skip('when always, all lines matching any of the regexes should succeed', async t => {
});

test.skip('when never, a line matching any of the specified regexes should fail', async t => {
});

test.skip('when never, no lines matching any of the regexes should succeed', async t => {
});

test.skip('value not specified, should fail', async t => {
});

test.skip('value not an array, should fail', async t => {
});
