export type PromiseElementConfig = {
    parent?: Node,
    count?: number,
    initialTimeout?: number,
}

/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string} selector The CSS selector of the element to return when available
 * @param {object?} config
 * @param {Node?} config.parent the parent element node (defaults to 'document')
 * @param {number?} config.count the maximum number of attempts to select the element (default 20 attempts)
 * @param {number?} config.initialTimeout The initial timeout in ms - subsequent timeouts will exponentially increase (default 100ms)
 * @returns {Promise<Element>}
 */
export function promiseElement(selector: string, config?: PromiseElementConfig
): Promise<Element> {
    const parent = config?.parent ?? document;
    const count = config?.count ?? 20;
    const initialTimeout = config?.initialTimeout ?? 100;

    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        } else {
            count < 1
                ? reject(
                      `element with selector ${selector} not found with parent ${parent.nodeName}`
                  )
                : setTimeout(() => {
                      resolve(
                          promiseElement(
                              selector,
                              {
                                  parent,
                                  count: count - 1,
                                  initialTimeout: initialTimeout * 2
                              }
                          )
                      );
                  }, initialTimeout);
        }
    });
}
