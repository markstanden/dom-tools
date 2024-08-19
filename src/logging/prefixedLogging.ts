/** Higher order function that takes a logger (such as console.log)
 *  and produces a prefixed log entry containing the error prefix
 * @param {(...logItems: unknown[]) => void} logFn
 * @param {string} prefix
 * @returns {(...logItems: unknown[]) => void}
 */
export function prefixedLogging(
    prefix: string,
    logFn: (...logItems: unknown[]) => void
) {
    return function (...logItems: unknown[]) {
        logFn(`${prefix}:\n `, ...logItems);
    };
}
