import { asClassname } from '../asClassName/asClassname.js';

/**
 * Returns a new HTML element with the provided cssClasses as classnames
 * @param {string} tagName The tagName of the element to create.
 * @param {string[]} cssClasses array of classnames to apply to the element - should contain the preceding dot
 * @returns {HTMLElement} The new element
 */
export function newElement<T = HTMLElement>(
    tagName: string,
    ...cssClasses: string[]
): T {
    const newElement = document.createElement(tagName);
    if (cssClasses && cssClasses.length > 0) {
        newElement.classList.add(...cssClasses.map(asClassname));
    }
    return newElement as T;
}
