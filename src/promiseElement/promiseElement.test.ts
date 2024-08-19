import { promiseElement } from './promiseElement';
import { addTestButton } from '../__testHelpers/addTestButton';

const REJECT_MESSAGE_TEXT = 'not found';

// @vitest-environment happy-dom
describe.concurrent('promiseElement tests:', () => {
    test.concurrent(
        `should reject for elements that don't start or get added to the DOM`,
        async ({ expect }) => {
            const maxDuration = 10;

            const promisedElement = promiseElement(
                '[data-test="not-present"]',
                { maxDuration }
            );

            await expect(promisedElement).rejects.toContain(
                REJECT_MESSAGE_TEXT
            );
        }
    );

    test.concurrent(
        `should reject for elements that appear too late`,
        async ({ expect }) => {
            const maxDuration = 10;
            const [_testButton, label] = addTestButton(maxDuration + 10);

            const promisedElement = promiseElement(`[data-test="${label}"]`, {
                maxDuration,
            });

            expect.assertions(1);
            await expect(promisedElement).rejects.toContain(
                REJECT_MESSAGE_TEXT
            );
        }
    );

    test.concurrent(
        `should resolve for elements already in the DOM`,
        async ({ expect }) => {
            const [testButton, label] = addTestButton();

            const result = promiseElement(`[data-test="${label}"]`);

            expect.assertions(1);
            expect(result).resolves.toStrictEqual(testButton);
        }
    );

    test.concurrent(
        `should return elements that appear after the function call, but within the check window`,
        async ({ expect }) => {
            const maxDuration = 10;
            const [testButton, label] = addTestButton(maxDuration - 5);

            const selector = `[data-test="${label}"]`;

            const synchronousLookup = document.querySelector(selector);
            expect(synchronousLookup).toBeNull;

            const promisedElement = promiseElement(selector, { maxDuration });

            expect.assertions(2);
            await expect(promisedElement).resolves.toStrictEqual(testButton);
        }
    );

    test.concurrent(
        `should always return asynchronously, even if the element is currently in the dom`,
        async ({ expect }) => {
            const [testButton, label] = addTestButton(0);

            const selector = `[data-test="${label}"]`;

            const synchronousLookup = document.querySelector(selector);
            expect(synchronousLookup).toBeTruthy;

            const promisedElement = promiseElement(selector);

            expect(promisedElement).not.toEqual(testButton);
            await expect(promisedElement).resolves.toStrictEqual(testButton);
            expect.assertions(3);
        }
    );
});
