import * as core from '@actions/core';

export class Output {
    static br(isReturn: boolean = false) {
        if (isReturn) {
            return '';
        }
        core.info('');
    }

    static info(text: string, isReturn: boolean = false) {
        if (isReturn) {
            return text;
        }
        core.info(text);
    }

    static success(text: string, isReturn: boolean = false) {
        const result = `\u001b[32m${text}`;
        if (isReturn) {
            return result;
        }
        core.info(result);
    }

    static warn(text: string, isReturn: boolean = false) {
        const result = `\u001b[33m${text}`;
        if (isReturn) {
            return result;
        }
        core.info(result);
    }

    static error(text: string, isReturn: boolean = false) {
        const result = `\u001b[31m${text}`;
        if (isReturn) {
            return result;
        }
        core.info(result);
    }
}
