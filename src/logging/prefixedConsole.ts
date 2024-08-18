import { prefixedLogging } from './prefixedLogging';

const DEFAULT_PREFIX = 'LOG ENTRY';

export function prefixedConsole(prefix: string = DEFAULT_PREFIX) {
    /**
     * Function that prefixes the preset prefix, and sends to console log.
     * These errors display in the local console only.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleLog(...logItems: any): void {
        prefixedLogging(prefix, console.log)(...logItems);
    }

    /**
     * Function that prefixes the preset prefix, and sends to console warn.
     * @param {...any[]} logItems
     * @returns {void}
     */
    function consoleWarn(...logItems: any): void {
        prefixedLogging(prefix, console.warn)(...logItems);
    }

    /**
     * Function that prefixes the preset prefix, and sends to console error.
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
