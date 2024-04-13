/**
 * Function adds a mutation observer to watch for changes to the passed html attribute.
 * On attribute change the promise is resolved.
 * @param { HTMLElement } elementWithAttribute The element to watch for the attribute change
 * @param { string } attributeName The attribute to watch for changes
 * @returns { Promise<string> }
 */
export function promiseWatchAttribute(
    elementWithAttribute: HTMLElement,
    attributeName: string,
): Promise<string> {
    return new Promise((resolve, reject) =>
    {
        if(!elementWithAttribute){
            reject("Element not found");
        }

        const observer = new MutationObserver(mutationHandler);
        observer.observe(elementWithAttribute, {
            attributes: true,
        });

        function mutationHandler(mutations: MutationRecord[], observer: MutationObserver): void {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === attributeName) {
                    resolve(elementWithAttribute.getAttribute(attributeName) ?? "");
                    observer.disconnect();
                }
            });
        }
    })
}
