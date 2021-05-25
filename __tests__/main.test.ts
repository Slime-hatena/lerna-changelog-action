import {info} from '../src/Output';
import {Changelog} from '../src/Changelog';
import * as process from 'process';
import * as fs from 'fs';

test('create markdown', async () => {
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
