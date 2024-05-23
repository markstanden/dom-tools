import { describe } from 'vitest';
import { listFormatter } from './listFormatter.ts';

describe.concurrent('listFormatter', async () => {
    describe.concurrent('using the default arguments', async () => {
        it.concurrent(
            'should return a single element for a one element list',
            async ({ expect }) => {
                const formatList = listFormatter();
                const initial = ['first'];
                const expected = 'first';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'should return a final separator for just two items',
            async ({ expect }) => {
                const formatList = listFormatter();
                const initial = ['first', 'second'];
                const expected = 'first and second';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'should separate the first two items with the standard separator, and use the final separator for the last two items',
            async ({ expect }) => {
                const formatList = listFormatter();
                const initial = ['first', 'second', 'third'];
                const expected = 'first, second and third';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'should separate the first three items with the standard separator, and use the final separator for the last two items',
            async ({ expect }) => {
                const formatList = listFormatter();
                const initial = ['first', 'second', 'third', 'fourth'];
                const expected = 'first, second, third and fourth';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );
    });

    describe.concurrent('can alter the default separators', async () => {
        it.concurrent(
            'should separate the first two items with the first separator, and use the final separator for the last two items',
            async ({ expect }) => {
                const formatList = listFormatter('.', '&');
                const initial = ['first', 'second', 'third'];
                const expected = 'first. second & third';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'It should allow for spaces within the separators',
            async ({ expect }) => {
                const formatList = listFormatter(' |', '|');
                const initial = ['first', 'second', 'third', 'fourth'];
                const expected = 'first | second | third | fourth';

                const result = formatList(...initial);

                expect(result).toEqual(expected);
            }
        );
    });
});
