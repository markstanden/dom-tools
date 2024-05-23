/**
 * Factory function returning a function to split text before and after
 * the **first** occurrence of the predefined *delimiter* and return as a tuple:
 * [before: string, after: string]
 * @param {string} delimiter
 * @returns {(toSplit: string) => [before:string, after:string]}
 */
export function splitAtFirst(delimiter: string) {
    return function splitAtFirstDelimiter(
        toSplit: string
    ): [before: string, after: string] {
        const [before, ...rest] = toSplit.split(delimiter);
        return [before ?? '', rest.join(delimiter) ?? ''];
    };
}
