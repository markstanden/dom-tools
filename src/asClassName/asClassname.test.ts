import { asClassname } from './asClassname.js';

describe.concurrent('asClassname', async () => {
    it.concurrent(
        'should remove preceding dot from single word selectors',
        async ({ expect }) => {
            const initial = '.first-class';
            const expected = 'first-class';

            const result = asClassname(initial);

            expect(result).toEqual(expected);
        }
    );

    it.concurrent(
        'should pass pass whole classnames from single word selectors without preceding dot',
        async ({ expect }) => {
            const initial = 'first-class';
            const expected = 'first-class';

            const result = asClassname(initial);

            expect(result).toEqual(expected);
        }
    );
});
