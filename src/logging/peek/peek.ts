import { prefixedConsole } from '../prefixedConsole.js';

const { consoleLog } = prefixedConsole('PEEK');

/**
 * Pass-through function for use in array method pipelines to
 * take a look at the state of the pipeline at that point.
 *
 * @example
 * [arrayItem, arrayItem, arrayItem]
 *     .map(peek('prefix'))   // prefix: [arrayItem, arrayItem, arrayItem]
 *     .map(x => x)           // [arrayItem, arrayItem, arrayItem]
 *
 * @param {string} prefix defaults to "", prefix to ID this peek
 * @param {(...[unknown]) => void} logger defaults to consoleLog with a prefix 'PEEK'
 * @returns {(unknown) => unknown}
 */

export function peek(
    prefix: string = '',
    logger: (...logItem: unknown[]) => void = consoleLog
): (arrayItem: unknown) => unknown {
    return function (arrayItem: unknown) {
        const formattedPrefix = `${prefix}:`;
        prefix ? logger(...[formattedPrefix, arrayItem]) : logger(arrayItem);
        return arrayItem;
    };
}
