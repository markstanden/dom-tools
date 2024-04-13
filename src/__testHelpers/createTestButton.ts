/**
 * Returns a basic button element for test purposes.
 * For tests to return accurate results when running concurrently labels should be unique to the test.
 * @param {string} dataTestValue The data-test attribute value of the test button.  defaults to 'button'
 * @returns {HTMLButtonElement}
 */
export function createTestButton(dataTestValue: string = 'button'): HTMLButtonElement {
    const button = document.createElement('button')
    button.setAttribute('data-test', dataTestValue)
    return button
}