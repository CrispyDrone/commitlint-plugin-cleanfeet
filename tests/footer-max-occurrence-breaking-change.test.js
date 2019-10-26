import test from 'ava';
import footer_max_occurrence_breaking_change from '../src/footer-max-occurrence-breaking-change.js'

test('null footer should succeed', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: null });

    t.true(result[0]);
});

test('empty footer should succeed', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: '' });

    t.true(result[0]);
});

test('specifying always or never should have no effect', async t => {
    const footer = { footer: 'BREAKING CHANGE: This breaks our api.' };
    const value = { max: 1, regex: '^BREAKING CHANGE: .+$' };
    const always_result = footer_max_occurrence_breaking_change(footer, 'always', value);
    const never_result = footer_max_occurrence_breaking_change(footer, 'never', value);

    t.is(always_result[0], never_result[0]);
});

test('no regex specified, should use default breaking change regex', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: This breaks our api.\r\nBREAKING CHANGE: This breaks our api.\r\nBREAKING CHANGE: This breaks our api.' }, 'always', { max: 2 });

    t.false(result[0]);
});

test('value by default enforces 1 breaking change', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: This breaks our api.\r\nBREAKING CHANGE: This also breaks our api.' }, 'always', { regex: '^BREAKING CHANGE: .+$' });

    t.false(result[0]);
});

test('value not an object, should fail with \'has to be object\' error message', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'Footer' }, 'always', 2);

    t.false(result[0]);
    t.true(result[1].includes('object'));
});

test('value null, should fail with \'can not be null\' error message', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'Footer' }, 'always', 2);

    t.false(result[0]);
    t.true(result[1].includes('null'));
});

test('custom regex specified, multiple standard breaking changes should succeed', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: This breaks our api.\r\nBREAKING CHANGE: This breaks our api.\r\nBREAKING CHANGE: This breaks our api.'}, 'always', { regex: '^CUSTOM BREAKING CHANGE$', max: 1 });

    t.true(result[0]);
});

test('custom regex specified, more matches than configured should fail', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'CUSTOM BREAKING CHANGES\r\nCUSTOM BREAKING CHANGES' }, 'always', { regex: '^CUSTOM BREAKING CHANGES$', max: 1 });

    t.false(result[0]);
});

test('number of breaking changes exceeds configured amount should fail', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: Not good\r\n.Issue #245\r\nBREAKING CHANGE: Also not good...' }, 'always', { max: 1 });

    t.false(result[0]);
});

test('number of breaking changes equals configured amount, should succeed', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: Not good.\r\nIssue #245' }, 'always', { max: 1 });

    t.true(result[0]);
});

test('number of breaking changes is less than configured amount, should succeed', async t => {
    const result = footer_max_occurrence_breaking_change({ footer: 'BREAKING CHANGE: Not good.\r\nIssue #245' }, 'always', { max: 2 });

    t.true(result[0]);
});
