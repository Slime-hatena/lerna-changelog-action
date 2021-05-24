declare module 'lerna-changelog' {
    export interface LabelDictionary {
        [key: string]: string;
    }
    export interface constructorConfig {
        repo: string;
        nextVersion: string | undefined;
        rootPath: string;
        labels: LabelDictionary;
        ignoreCommitters: string[];
        cacheDir: string;
    }

    export interface createMarkdownConfig {
        tagFrom: string;
        tagTo: string;
    }

    export class Changelog {
        constructor(config: constructorConfig);
        createMarkdown(options: createMarkdownConfig): string;
    }
}
