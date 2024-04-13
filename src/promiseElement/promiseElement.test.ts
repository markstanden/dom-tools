import {promiseElement} from "./promiseElement.ts";
import {addTestButton} from "../__testHelpers/addTestButton.js";

const REJECT_MESSAGE_TEXT = 'not found'

// @vitest-environment happy-dom
describe.concurrent('promiseElement tests:', () => {

    test.concurrent(`should reject for elements that don't start or get added to the DOM`, async ({expect}) => {
        const maxCount = 5;
        const initialTimeout = 1;

        const promisedElement = promiseElement('[data-test="not-present"]', document, maxCount, initialTimeout);

        await expect(promisedElement).rejects.toContain(REJECT_MESSAGE_TEXT);
    });

    test.concurrent(`should reject for elements that appear too late`, async ({task, expect}) => {
        const [_testButton, label] = addTestButton(task, true, 100);

        const maxCount = 5;
        const initialTimeout = 1;

        const promisedElement = promiseElement(`[data-test="${label}"]`, document, maxCount, initialTimeout);

        expect.assertions(1);
        await expect(promisedElement).rejects.toContain(REJECT_MESSAGE_TEXT);
    });

    test.concurrent(`should resolve for elements already in the DOM`,  async ({task, expect}) => {
        const [testButton, label] = addTestButton(task, false);

        const result = promiseElement(`[data-test="${label}"]`);

        expect.assertions(1);
        expect(result).resolves.toStrictEqual(testButton);
    });


    test.concurrent(`should return elements that appear after the function call, but within the check window`, async ({task, expect}) => {
        const [testButton, label] = addTestButton(task, true, 50);

        const maxCount = 8;
        const initialTimeout = 1;
        const selector = `[data-test="${label}"]`;

        const synchronousLookup = document.querySelector(selector);
        const promisedElement = promiseElement(selector, document, maxCount, initialTimeout);

        expect.assertions(2);
        expect(synchronousLookup).not.toStrictEqual(testButton);
        await expect(promisedElement).resolves.toStrictEqual(testButton);
    });

})