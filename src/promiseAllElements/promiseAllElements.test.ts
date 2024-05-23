import { promiseAllElements } from './promiseAllElements.ts';
import { addTestButton } from '../__testHelpers/addTestButton.js';

const REJECT_MESSAGE_TEXT = 'not found';

// @vitest-environment happy-dom
describe.concurrent('promiseAllElements tests:', () => {
    test.concurrent(
        `should reject if all elements don't start or get added to the DOM`,
        { timeout: 500 },
        async ({ expect }) => {
            const promisedElement = promiseAllElements(
                [
                    '[data-test="not-present"]',
                    '[data-test="not-present-either"]',
                ],
                { maxDuration: 200 }
            );

            await expect(promisedElement).rejects.toContain(
                REJECT_MESSAGE_TEXT
            );
        }
    );

    test.concurrent(
        `should reject for elements that appear too late`,
        { timeout: 100 },
        async ({ expect }) => {
            const [_testButton1, label1] = addTestButton(50);
            const [_testButton2, label2] = addTestButton(20);

            const promisedElement = promiseAllElements(
                [`[data-test="${label1}"]`, `[data-test="${label2}"]`],
                { maxDuration: 10 }
            );

            expect.assertions(1);
            await expect(promisedElement).rejects.toContain(
                REJECT_MESSAGE_TEXT
            );
        }
    );

    test.concurrent(
        `should resolve for elements already in the DOM`,
        async ({ expect }) => {
            const [testButton1, label1] = addTestButton();
            const [testButton2, label2] = addTestButton();

            const promisedElement = promiseAllElements([
                `[data-test="${label1}"]`,
                `[data-test="${label2}"]`,
            ]);

            expect.assertions(1);
            expect(promisedElement).resolves.toStrictEqual([
                testButton1,
                testButton2,
            ]);
        }
    );

    test(`should return elements that appear after the function call, but within the check window`, async ({
        expect,
    }) => {
        const [testButton1, label1] = addTestButton(50);
        const selector1 = `[data-test="${label1}"]`;
        const synchronousLookup1 = document.querySelector(selector1);
        expect(synchronousLookup1).not.toStrictEqual(testButton1);

        const [testButton2, label2] = addTestButton(100);
        const selector2 = `[data-test="${label2}"]`;
        const synchronousLookup2 = document.querySelector(selector2);
        expect(synchronousLookup2).not.toStrictEqual(testButton2);

        const promisedElements = promiseAllElements([
            `[data-test="${label1}"]`,
            `[data-test="${label2}"]`,
        ]);

        expect.assertions(3);
        await expect(promisedElements).resolves.toStrictEqual([
            testButton1,
            testButton2,
        ]);
    });
});
