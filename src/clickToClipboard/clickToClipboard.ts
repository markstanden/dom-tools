export function clickToClipboard(
    clickElement: HTMLElement,
    textElement: HTMLElement = clickElement,
    logger: (reason: string) => void = () => {},
    clipboard: {
        writeText: (text: string) => Promise<void>;
    } = navigator.clipboard
): HTMLElement {
    clickElement.addEventListener('click', () =>
        clipboard.writeText(textElement.innerText).catch(logger)
    );
    return clickElement;
}
