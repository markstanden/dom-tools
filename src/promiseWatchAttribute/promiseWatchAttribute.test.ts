import {promiseWatchAttribute} from "./promiseWatchAttribute.ts";
import {expect} from "vitest";
import { createTestElement } from '../__testHelpers/createTestElement.js';

// @vitest-environment happy-dom
describe.concurrent('promiseWatchAttribute tests:', () => {

    test.concurrent('Promise should resolve to the new value if the attribute mutates', async () => {
        const [testButton, buttonName] = createTestElement('button')();
        document.body.appendChild(testButton)

        const promise = promiseWatchAttribute(testButton, "data-test")

        // asynchronously change the attribute value at the next tick of the task queue
        setTimeout(() => testButton.setAttribute("data-test", "mutated-value"))

        // Synchronous assertion - button attribute has not changed yet.
        expect(testButton.getAttribute("data-test")).toEqual(buttonName);

        // Asynchronous assertions - wait for the promise to resolve.
        await expect(promise).resolves.toEqual("mutated-value")
        expect(testButton.getAttribute("data-test")).toEqual("mutated-value");
    });
})