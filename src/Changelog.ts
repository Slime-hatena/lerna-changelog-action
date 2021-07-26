import {br, info, success} from './Output';
import * as lernaChangelog from 'lerna-changelog';

export class Changelog {
    private labels: lernaChangelog.LabelDictionary;

    repo = '';
    nextVersion: string | undefined = undefined;
    rootPath = './';
    ignoreCommitters: string[] = [];
    cacheDir = '.changelog';

    constructor(labels: lernaChangelog.LabelDictionary = {}) {
        this.labels = labels;
        success('Create a changelog based on the following label information.');
        for (const key of Object.keys(this.labels)) {
            info(`Label:  ${key}`);
            info(`Header: ${this.labels[key]}`);
            br();
        }
        br();
    }

    async generate(from = '', to = ''): Promise<string> {
        const changelog = new lernaChangelog.Changelog({
            repo: this.repo,
            nextVersion: this.nextVersion,
            rootPath: this.rootPath,
            labels: this.labels,
            ignoreCommitters: this.ignoreCommitters,
            cacheDir: this.cacheDir
        });

        const markdown = await changelog.createMarkdown({
            tagFrom: from,
            tagTo: to
        });

        return markdown;
    }
}
