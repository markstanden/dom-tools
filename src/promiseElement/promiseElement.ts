/**
 * Returns a promise of an element that may or may not be present in the DOM.
 * @param {string} selector The CSS selector of the element to return when available
 * @param {Node} parent the parent element node (defaults to 'document')
 * @param {number} count the maximum number of attempts to select the element (default 20 attempts)
 * @param {number} initialTimeout The initial timeout in ms - subsequent timeouts will exponentially increase (default 100ms)
 * @returns {Promise<Element>}
 */
export function promiseElement(
    selector: string,
    parent: Node = document,
    count: number = 20,
    initialTimeout: number = 100
): Promise<Element> {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
        } else {
            count < 1
                ? reject(
                      `element with selector ${selector} not found with parent ${parent.nodeName}`
                  )
                : setTimeout(() => {
                      resolve(
                          promiseElement(
                              selector,
                              parent,
                              count - 1,
                              initialTimeout * 2
                          )
                      );
                  }, initialTimeout);
        }
    });
}
