export type PromiseElementConfig = {
    parent?: Node,
    initialTimeout?: number,
    maxDuration?: number,
}

/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string} selector The CSS selector of the element to return when available
 * @param {object?} config
 * @param {Node?} config.parent the parent element node (defaults to 'document')
 * @param {number?} config.initialTimeout The initial timeout in ms - subsequent timeouts will exponentially increase (default 100ms)
 * @param {number?} config.maxDuration The max duration to wait for the element to become available, after which the promise is rejected.
 * @returns {Promise<Element>}
 */
export function promiseElement(selector: string, config?: PromiseElementConfig
): Promise<Element> {
    const parent = config?.parent ?? document;
    const maxDuration = config?.maxDuration ?? 2000;
    const initialTimeout = config?.initialTimeout ?? 1;

    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        } else {
            initialTimeout >= (maxDuration / 2)
                ? reject(
                      `element with selector ${selector} not found with parent ${parent.nodeName}`
                  )
                : setTimeout(() => {
                      resolve(
                          promiseElement(
                              selector,
                              {
                                  parent,
                                  maxDuration,
                                  initialTimeout: Math.min(initialTimeout * 2, maxDuration - initialTimeout)
                              }
                          )
                      );
                  }, initialTimeout);
        }
    });
}
