/**
 * Running tests concurrently requires unique identifiers to
 * ensure the correct elements are selected.  This function returns a
 * pseudo random ID string to uniquely identify test elements.
 * @param prefix
 */
export function createTestUid(prefix: string = "") {
    const length = 10;
    return `${prefix}:${Math.floor(Math.random() * 10 ** length).toString(10)}`;
}