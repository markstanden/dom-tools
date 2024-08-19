import { splitAtLast } from './splitAtLast.js';

describe.concurrent('splitAtLast', async () => {
    describe.concurrent('string contains delimiter', async () => {
        it.concurrent(
            'should split text at last occurrence of delimiter',
            async ({ expect }) => {
                const splitAtLastComma = splitAtLast(',');
                const initial = 'first,second,third,fourth,fifth';
                const expected = ['first,second,third,fourth', 'fifth'];

                const result = splitAtLastComma(initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'delimiter can contain multiple characters',
            async ({ expect }) => {
                const splitAtLastComma = splitAtLast(' | ');
                const initial = 'first | second | third | fourth | fifth';
                const expected = ['first | second | third | fourth', 'fifth'];

                const result = splitAtLastComma(initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent('whitespace should be respected', async ({ expect }) => {
            const splitAtLastComma = splitAtLast(' | ');
            const initial = ' first|second|third  |  fourth|fifth ';
            const expected = [' first|second|third ', ' fourth|fifth '];

            const result = splitAtLastComma(initial);

            expect(result).toEqual(expected);
        });
    });

    describe.concurrent('string does not contain delimiter', async () => {
        it.concurrent(
            'should return the original text in the before position of the tuple returned',
            async ({ expect }) => {
                const splitAtLastComma = splitAtLast(',');
                const initial = 'first second third fourth fifth';

                const [before] = splitAtLastComma(initial);

                expect(before).toEqual(initial);
            }
        );

        it.concurrent(
            'should return falsy in the after position of the returned tuple',
            async ({ expect }) => {
                const splitAtLastComma = splitAtLast(',');
                const initial = 'first second third fourth fifth';

                const [before, after] = splitAtLastComma(initial);

                expect(before).toBeTruthy();
                expect(after).toBeFalsy();
            }
        );
    });
});
