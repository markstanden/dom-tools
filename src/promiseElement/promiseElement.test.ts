import {promiseElement} from "./promiseElement";
import {createTestButton} from "../__testHelpers/createTestButton";

// @vitest-environment happy-dom
describe.concurrent('initial test', () => {

    test.concurrent(`should reject for elements that don't start or get added to the DOM`, async () => {
        const maxCount = 5;
        const initialTimeout = 1;

        const promiseResult = async (): Promise<Element> =>
            await promiseElement('[data-test="not-present"]', document, maxCount, initialTimeout);

        await expect(promiseResult()).rejects.contains('not found')
    });

    test.concurrent(`should reject for elements that appear too late`, async () => {
        const testButton = createTestButton('appears-too-late');
        setTimeout(() => document.body.appendChild(testButton), 250);

        const maxCount = 5;
        const initialTimeout = 1;

        const promiseResult = async (): Promise<Element> =>
            await promiseElement('[data-test="appears-too-late"]', document, maxCount, initialTimeout);

        await expect(promiseResult()).rejects.contains('not found')
    });

    test.concurrent(`should resolve for elements already in the DOM`, async () => {
        const testButton = createTestButton('is-present-at-call-time');
        document.body.appendChild(testButton);

        const result = await promiseElement(`[data-test="is-present-at-call-time"]`);

        expect(result).toStrictEqual(testButton);
    });

    test.concurrent(`should return elements that appear after the function call, but within the check window`, async () => {
        const label = 'appears-during-the-check-window';
        const testButton = createTestButton(label);
        setTimeout(() => document.body.appendChild(testButton), 25);

        const maxCount = 10;
        const initialTimeout = 1;
        const selector = `[data-test="${label}"]`

        const synchronousLookup = document.querySelector(selector);
        const promiseResult = async (): Promise<Element> =>
            await promiseElement(selector, document, maxCount, initialTimeout);

        expect(synchronousLookup).not.toStrictEqual(testButton);
        await expect(promiseResult()).resolves.toStrictEqual(testButton);
    });
})