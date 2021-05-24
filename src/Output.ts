import * as core from '@actions/core';

export function br(isReturn = false): string | undefined {
    if (isReturn) {
        return '';
    }
    core.info('');
}

export function info(text: string, isReturn = false): string | undefined {
    if (isReturn) {
        return text;
    }
    core.info(text);
}

export function success(text: string, isReturn = false): string | undefined {
    const result = `\u001b[32m${text}`;
    if (isReturn) {
        return result;
    }
    core.info(result);
}

export function warn(text: string, isReturn = false): string | undefined {
    const result = `\u001b[33m${text}`;
    if (isReturn) {
        return result;
    }
    core.info(result);
}

export function error(text: string, isReturn = false): string | undefined {
    const result = `\u001b[31m${text}`;
    if (isReturn) {
        return result;
    }
    core.info(result);
}
