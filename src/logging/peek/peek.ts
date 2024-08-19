import { prefixedConsole } from '../prefixedConsole.js';

const { consoleLog } = prefixedConsole('PEEK');

/**
 * Pass-through function for use in array method pipelines to
 * take a look at the state of the pipeline at that point.
 *
 * @example
 * [any, any, any]
 *     .map(peek('prefix'))   // prefix: [any, any, any]
 *     .map(x => x)           // Returns: [any, any, any]
 *
 * @param {string} prefix defaults to "", prefix to ID this peek
 * @param {(...[any]) => void} logger defaults to consoleLog with a prefix 'PEEK'
 * @returns {(any) => any}
 */
export function peek(
    prefix: string = '',
    logger: (...any: Object[]) => void = consoleLog
): (any: Object) => Object {
    return function (any: Object) {
        const message = `${prefix}:`;
        prefix ? logger(...[message, any]) : logger(any);
        return any;
    };
}
