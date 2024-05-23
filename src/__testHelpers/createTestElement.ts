import { createTestUid } from './createTestUid.js';

/**
 * Returns a basic labelled element for test purposes.
 * For tests to return accurate results when running concurrently labels should be unique to the test.
 * @param {string?} tagName The html tag name of the returned element
 * @param {string?} dataTestValue The data-test attribute value of the test button.  defaults to 'button'
 * @returns {[element: HTMLElement, label: string]}
 */
export function createTestElement(
    tagName: string = 'div',
    dataTestValue: string = createTestUid()
): [element: HTMLElement, label: string] {
    const element = document.createElement(tagName);
    element.setAttribute('data-test', dataTestValue);
    return [element, dataTestValue];
}
