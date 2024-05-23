/**
 * Running tests concurrently requires unique identifiers to
 * ensure the correct elements are selected.  This function returns a
 * pseudo random ID string to uniquely identify test elements.
 * @param {string} prefix - A prefix to the test id.
 * @param {number} length - The length of the identifier
 * @param {() => number} random - A function to return a
 * @returns {string} A pseudo-random identifier
 */
export function createTestUid(
    prefix: string = '',
    length: number = 10,
    random = Math.random
) {
    return `${prefix}:${Math.floor(random() * 10 ** length).toString(10)}`;
}
