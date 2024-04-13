import { promiseElement, PromiseElementConfig } from '../promiseElement/promiseElement.ts';

/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string[]} selectors The CSS selector of the element to return when available
 * @param config
 * @returns {Promise<Element[]>}
 */
export function promiseAllElements(selectors: string[], config?: PromiseElementConfig): Promise<Element[]> {
    const promisedElements = selectors.map(selector => promiseElement(selector, config));
    return Promise.all(promisedElements)
    // return new Promise((resolve, reject) => {
    //     const promisedElements = selectors.map(selector => promiseElement(selector));
    //     return Promise.allSettled(promisedElements)
    // });
}
