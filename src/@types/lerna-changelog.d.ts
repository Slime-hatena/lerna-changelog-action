declare module 'lerna-changelog' {
    export interface constructorConfig {
        repo: string;
        nextVersion: string | undefined;
        rootPath: string;
        labels: Array<string>;
        ignoreCommitters: Array<string>;
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
