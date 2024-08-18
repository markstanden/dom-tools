export type PromiseElementConfig = {
    parent?: Element | Document;
    maxDuration?: number;
};

/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string} selector The CSS selector of the element to return when available
 * @param {object?} config
 * @param {Element?} config.parent the parent element node (defaults to 'document')
 * @param {number?} config.maxDuration The max duration to wait for the element to become available, after which the promise is rejected.
 * @returns {Promise<Element>}
 */
export function promiseElement<T extends Element>(
    selector: string,
    config?: PromiseElementConfig,
): Promise<T> {
    const parent: Element | Document = config?.parent ?? document;
    const maxDuration = config?.maxDuration;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(
            () => reject(`element with selector ${selector} not found with parent ${parent.nodeName}`),
            maxDuration);
        const element = parent.querySelector(selector) as T | null;
        if (element) {
            resolve(element);
            return;
        } else {
            const mutationObserver = new MutationObserver((_mutations) => {
                const element = parent.querySelector(selector) as T | null;
                if (element) {
                    clearTimeout(timeout);
                    resolve(element);
                }
            });
            mutationObserver.observe(parent, { childList: true, subtree: true });
        }
    });
}
