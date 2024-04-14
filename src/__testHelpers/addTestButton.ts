import { createTestElement } from './createTestElement.js';

/**
 * Helper that adds a test button to the DOM - either synchronously or asynchronously.
 * @param {number?} delay providing delay implies asynchronous addition
 * @returns {[testButton:HTMLButtonElement, dataTestValue:string]} Tuple providing the button element and the applied data-test label.
 */
export function addTestButton(delay?: number):[testButton:HTMLButtonElement, label:string]{
    const async = delay !== undefined;

    const [testButton, dataTestValue] = createTestElement('button')();
    const append = () => document.body.appendChild(testButton);

    async
        ? setTimeout(append, delay)
        : append();

    return [testButton as HTMLButtonElement, dataTestValue];
}