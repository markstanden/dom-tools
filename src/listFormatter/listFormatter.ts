/**
 * Factory function that returns a function that neatly formats a list of strings
 * @returns {(...items: string) => string}
 * @param {string} separator
 * @param {string} finalSeparator
 */

export function listFormatter(
    separator: string = ',',
    finalSeparator: string = 'and'
): (...items: string[]) => string {
    return function formatAsList(...items: string[]) {
        if (items.length < 1) {
            return '';
        }

        const allButLast = items.slice(0, -1);
        const last = items.slice(-1);
        return allButLast.length > 0
            ? [allButLast.join(`${separator} `), last].join(
                  ` ${finalSeparator} `
              )
            : last[0] ?? '';
    };
}
