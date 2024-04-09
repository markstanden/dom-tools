/**
 * Returns a basic button element for test purposes.
 * For tests to return accurate results when running concurrently labels should be unique to the test.
 * @param {string} testLabel The data-test attribute value of the test button.  defaults to 'button'
 * @returns {HTMLButtonElement}
 */
export function createTestButton(testLabel: string = 'button'): HTMLButtonElement {
    const button = document.createElement('button')
    button.setAttribute('data-test', testLabel)
    return button
}