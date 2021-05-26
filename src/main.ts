import * as core from '@actions/core';
import * as fs from 'fs';
import {Changelog} from './Changelog';
import {info, success, error, br} from '../src/Output';

async function run(): Promise<void> {
    try {
        process.env['GITHUB_AUTH'] = core.getInput('GITHUB_AUTH');
        const LABEL_SETTING_FILE_PATH = core.getInput(
            'LABEL_SETTING_FILE_PATH'
        );
        const TAG_FROM = core.getInput('TAG_FROM');
        const TAG_TO = core.getInput('TAG_TO');
        const REMOVE_TITLE_LINE =
            core.getInput('REMOVE_TITLE_LINE').toLowerCase() === 'true';

        const labelSettings = JSON.parse(
            fs.readFileSync(LABEL_SETTING_FILE_PATH, 'utf8')
        );
        const changelog = new Changelog(labelSettings);
        changelog.repo = process.env.GITHUB_REPOSITORY ?? '';
        let markdown = await changelog.generate(TAG_FROM, TAG_TO);

        if (REMOVE_TITLE_LINE) {
            markdown = markdown.substr(
                markdown.indexOf(
                    '\n',
                    markdown.indexOf('\n', markdown.indexOf('\n', 0) + 1) + 1
                ) + 1
            );
        }

        if (markdown.length === 0) {
            error(
                'The changelog was not generated. Please check the label settings and whether the pull requests have been merged.'
            );
        } else {
            success('Changelog has been generated.');
            info(markdown);
        }
        br();

        core.setOutput('markdown', markdown);
    } catch (e) {
        core.setFailed(e.message);
    }
}

run();
