import {promiseWatchAttribute} from "./watchAttribute.ts";
import {createTestButton} from "../__testHelpers/createTestButton.ts";
import {expect} from "vitest";

// @vitest-environment happy-dom
describe.concurrent('initial test', () => {

    test.concurrent('callback should not be called if the attribute does not mutate', async (test) => {
        const testName = test.task.name;
        const buttonName = `watchAttribute-${testName}`;
        const testButton = createTestButton(buttonName);
        document.body.appendChild(testButton)

        const promise = promiseWatchAttribute(testButton, "data-test");

        expect(testButton.getAttribute("data-test")).toEqual(buttonName);
        expect(promise).not.resolves;
    });

    test.concurrent('callback should be called if the attribute mutates', async (test) => {
        const testName = test.task.name;
        const buttonName = `watchAttribute-${testName}`;
        const testButton = createTestButton(buttonName);
        document.body.appendChild(testButton)

        const promise = promiseWatchAttribute(testButton, "data-test")

        testButton.setAttribute("data-test", "mutated-value")

        expect(testButton.getAttribute("data-test")).toEqual("mutated-value");
        expect(promise).resolves.toEqual("mutated-value")
    });
})