import {info, br, success, warn, error} from '../src/Output';
import {Changelog} from '../src/Changelog';
import * as process from 'process';
import * as fs from 'fs';

test('check Changelog.ts', async () => {
    if (process.env['GITHUB_AUTH'] === undefined) {
        warn("process.env.GITHUB_AUTH is not set. Set from '/.GITHUB_AUTH'.");
        process.env['GITHUB_AUTH'] = fs
            .readFileSync('./.GITHUB_AUTH')
            .toString();
    }

    const from = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
    const to = 'origin/develop';
    const labels = {
        'Type: Breaking Change': 'Breaking Change',
        'Type: Feature': 'Feature',
        'Type: Bug': 'Bug fix',
        'Type: Maintenance': 'Maintenance',
        'Type: Documentation': 'Documentation',
        'Type: Refactoring': 'Refactoring'
    };

    const changelog = new Changelog(labels);
    changelog.repo = 'Slime-hatena/lerna-changelog-action';

    let markdown = await changelog.generate(from, to);

    success('------------------');
    info(markdown);
    success('------------------');
    markdown = markdown.substr(
        markdown.indexOf(
            '\n',
            markdown.indexOf('\n', markdown.indexOf('\n', 0) + 1) + 1
        ) + 1
    );
    info(markdown);
    success('------------------');
}, 500000);

test('check Output.ts', async () => {
    const toEqualData = [
        {
            value: br(),
            result: undefined
        },
        {
            value: br(true),
            result: ''
        },
        {
            value: info('info message'),
            result: undefined
        },
        {
            value: info('info message', true),
            result: 'info message'
        },
        {
            value: success('success message'),
            result: undefined
        },
        {
            value: success('success message', true),
            result: '\u001b[32msuccess message\u001b[m'
        },
        {
            value: warn('warn message'),
            result: undefined
        },
        {
            value: warn('warn message', true),
            result: '\u001b[33mwarn message\u001b[m'
        },
        {
            value: error('error message'),
            result: undefined
        },
        {
            value: error('error message', true),
            result: '\u001b[31merror message\u001b[m'
        }
    ];

    toEqualData.forEach((element) => {
        expect(element.value).toEqual(element.result);
    });
});
