import { prefixedLogging } from './prefixedLogging';

const DEFAULT_PREFIX = 'LOG ENTRY';

export type Log = (...logItems: unknown[]) => void;
export type Prefixer = (prefix: string, fn: Log) => Log;

export function prefixedConsole(
    prefix: string = DEFAULT_PREFIX,
    prefixer: Prefixer = prefixedLogging
) {
    /**
     * Function that prefixes the preset prefix, and sends to console log.
     * These errors display in the local console only.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleLog(...logItems: unknown[]): void {
        // eslint-disable-next-line no-console
        prefixer(prefix, console.log)(...logItems);
    }

    /**
     * Function that prefixes the preset prefix, and sends to console warn.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleWarn(...logItems: unknown[]): void {
        // eslint-disable-next-line no-console
        prefixer(prefix, console.warn)(...logItems);
    }

    /**
     * Function that prefixes the preset prefix, and sends to console error.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleError(...logItems: unknown[]): void {
        // eslint-disable-next-line no-console
        prefixer(prefix, console.error)(...logItems);
    }

    return {
        consoleLog,
        consoleWarn,
        consoleError,
    };
}
