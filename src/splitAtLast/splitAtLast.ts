/**
 * Factory function returning a function to split text before and after
 * the **last** occurrence of the predefined *delimiter* and return as a tuple:
 * [before: string, after: string]
 * If the delimiter is not present in the supplied string,
 * returns the unaltered initial string as the before in the returned tuple.
 * @param {string} delimiter
 * @returns {(toSplit: string) => [before:string, after:string]}
 */
export function splitAtLast(delimiter: string) {
    return function splitByLastDelimiter(
        toSplit: string
    ): [before: string, after: string] {
        const split = toSplit.split(delimiter);

        // If the delimiter is not present in the supplied string
        if (split.length <= 1) {
            return [toSplit, ''];
        }

        return [
            split.slice(0, -1).join(delimiter),
            split.slice(-1).join(delimiter),
        ];
    };
}
