import {info, br, success, warn, error} from '../src/Output';
import {Changelog} from '../src/Changelog';
import * as process from 'process';
import * as fs from 'fs';

test('check Changelog.ts', async () => {
    process.env['GITHUB_AUTH'] = fs.readFileSync('./.GITHUB_AUTH').toString();

    const from = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
    const to = 'origin/main';
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

    const markdown = await changelog.generate(from, to);
    info(markdown);
});

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
