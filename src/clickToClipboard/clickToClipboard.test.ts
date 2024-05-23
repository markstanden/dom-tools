import { vi } from 'vitest';
import { clickToClipboard } from './clickToClipboard.js';
import { addTestButton } from '../__testHelpers/addTestButton.js';
import { createTestElement } from '../__testHelpers/createTestElement.js';

// @vitest-environment happy-dom
function getMockClipboard() {
    return {
        writeText: vi.fn(
            (_text: string) => new Promise<void>((resolve) => resolve())
        ),
    };
}

describe.concurrent('clickToClipboard', async () => {
    it.concurrent(
        'should copy the text to the clipboard when clicked',
        async ({ expect }) => {
            const clipboard = getMockClipboard();
            const [clicker] = addTestButton(0);
            const [text] = createTestElement('p');
            text.innerText = 'Test Text';

            clickToClipboard(clicker, text, undefined, clipboard);
            clicker.click();

            expect(clipboard.writeText).toHaveBeenCalledWith('Test Text');
        }
    );

    it.concurrent(
        'should not copy the text to the clipboard if not clicked',
        async ({ expect }) => {
            const clipboard = getMockClipboard();
            const [clicker] = addTestButton(0);
            const [text] = createTestElement('p');
            text.innerText = 'Test Text';

            clickToClipboard(clicker, text, undefined, clipboard);

            expect(clipboard.writeText).not.toBeCalled();
        }
    );
});
