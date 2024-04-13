import {Test} from "vitest/dist/index.js";
import {createTestButton} from "./createTestButton.js";

/**
 * Helper that adds a test button to the DOM - either synchronously or asynchronously.
 * @param {<Test<{}>} task The vitest readonly object containing metadata about the test.
 * @param {boolean} async should the element be added asynchronously? defaults to false
 * @param {number} timeout timeout for the asynchronous addition - defaults to 0
 * @returns {[testButton:HTMLButtonElement, label:string]} Tuple providing the button element and its data-test label.
 */
export function addTestButton(task:Test<{}>, async: boolean = false, timeout: number = 0):[testButton:HTMLButtonElement, label:string]{
    const label = task.name;
    const testButton = createTestButton(label);
    const append = () => document.body.appendChild(testButton);

    async
        ? setTimeout(append, timeout)
        : append();

    return [testButton, label];
}