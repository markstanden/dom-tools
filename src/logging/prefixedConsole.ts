import { prefixedLogging } from './prefixedLogging.js';

const DEFAULT_PREFIX = 'LOG ENTRY';

export function prefixedConsole(prefix: string = DEFAULT_PREFIX) {
    /**
     * Creates a prefixed error string with the test ID, and sends to console log.
     * These errors display in the local console only.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleLog(...logItems: any): void {
        prefixedLogging(prefix, console.log)(...logItems);
    }

    /**
     * Creates a prefixed error string with the test ID, and sends to console warn.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleWarn(...logItems: any): void {
        prefixedLogging(prefix, console.warn)(...logItems);
    }

    /**
     * Creates a prefixed error string with the test ID, and sends to console error.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleError(...logItems: any): void {
        prefixedLogging(prefix, console.error)(...logItems);
    }

    return {
        consoleLog,
        consoleWarn,
        consoleError,
    };
}
