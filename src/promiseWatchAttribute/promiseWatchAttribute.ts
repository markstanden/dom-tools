/**
 * Function adds a mutation observer to watch for changes to the passed html attribute.
 * If it is changed it will invoke the passed callback.
 * @param { HTMLElement } elementWithAttribute The element to watch for the attribute change
 * @param { string } attributeName The attribute to watch for changes
 * @returns { Promise<string> }
 */
export function promiseWatchAttribute(
    elementWithAttribute: HTMLElement,
    attributeName: string,
) {
    return new Promise((resolve, reject) =>
    {
        //TODO: Add reject logic.
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === attributeName) {
                    resolve(
                        elementWithAttribute.getAttribute(attributeName) ?? ''
                    );
                }
            });
        });

        observer.observe(elementWithAttribute, {
            attributes: true,
        });
    })
}
