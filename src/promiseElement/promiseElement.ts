export type PromiseElementConfig = {
    parent?: Element | Document;
    maxDuration?: number;
};

/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string} selector The CSS selector of the element to return when available
 * @param {object?} config
 * @param {Element?} config.parent the parent element node (defaults to 'document')
 * @param {number?} config.maxDuration The max duration to wait for the element to become available,
 * after which the promise is rejected. defaults to 10 seconds
 * @returns {Promise<Element>}
 */
export function promiseElement<T extends Element = Element>(
    selector: string,
    config?: PromiseElementConfig
): Promise<T> {
    const parent: Element | Document = config?.parent ?? document;
    const maxDuration = config?.maxDuration ?? 10000;

    return new Promise((resolve, reject) => {
        // If already in the DOM immediately resolve
        const element = parent.querySelector(selector) as T | null;
        if (element) {
            resolve(element);
            return;
        }

        // Not yet in the DOM.
        const rejectMessage = `element with selector ${selector} not found with parent ${parent.nodeName}`;
        const timeout = setTimeout(() => reject(rejectMessage), maxDuration);

        // Only recheck when parent has new descendants added
        const mutationObserver = new MutationObserver((_mutations) => {
            const element = parent.querySelector(selector) as T | null;
            if (element) {
                clearTimeout(timeout);
                resolve(element);
            }
        });
        mutationObserver.observe(parent, {
            childList: true,
            subtree: true,
        });
    });
}
