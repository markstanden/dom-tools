import {createTestButton} from "./createTestButton.js";

/**
 * Helper that adds a test button to the DOM - either synchronously or asynchronously.
 * @param {number?} delay providing delay implies asynchronous addition
 * @param {string?} dataTest the data-test value applied to the button.  Defaults to a random number.
 * @returns {[testButton:HTMLButtonElement, dataTestValue:string]} Tuple providing the button element and the applied data-test label.
 */
export function addTestButton(delay?: number, dataTest?: string):[testButton:HTMLButtonElement, label:string]{
    const async = delay !== undefined;

    const uid = Math.floor(Math.random() * 10000).toString(10);
    const dataTestValue = dataTest ?? uid;

    const testButton = createTestButton(dataTestValue);
    const append = () => document.body.appendChild(testButton);

    async
        ? setTimeout(append, delay)
        : append();

    return [testButton, dataTestValue];
}