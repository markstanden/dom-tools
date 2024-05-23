/** Higher order function that takes a logger (such as console.log)
 *  and produces a prefixed log entry containing the error prefix
 * @param {(...logItems: any) => void} logFn
 * @param {string} prefix
 * @returns {(...logItems: any) => void}
 */
export function prefixedLogging(
    prefix: string,
    logFn: (...logItems: any) => void
) {
    return function (...logItems: any) {
        logFn(`${prefix}:\n `, ...logItems);
    };
}
