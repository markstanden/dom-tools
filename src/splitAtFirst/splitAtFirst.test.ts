import { splitAtFirst } from './splitAtFirst.js';

describe.concurrent('splitAtFirst', async () => {
    describe.concurrent('string contains delimiter', async () => {
        it.concurrent(
            'should split text at first occurrence of delimiter',
            async ({ expect }) => {
                const splitAtFirstComma = splitAtFirst(',');
                const initial = 'first,second,third,fourth,fifth';
                const expected = ['first', 'second,third,fourth,fifth'];

                const result = splitAtFirstComma(initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent(
            'delimiter can contain multiple characters',
            async ({ expect }) => {
                const splitAtFirstComma = splitAtFirst(' | ');
                const initial = 'first | second | third | fourth | fifth';
                const expected = ['first', 'second | third | fourth | fifth'];

                const result = splitAtFirstComma(initial);

                expect(result).toEqual(expected);
            }
        );

        it.concurrent('whitespace should be respected', async ({ expect }) => {
            const splitAtFirstComma = splitAtFirst(' | ');
            const initial = ' first|second|third  |  fourth|fifth ';
            const expected = [' first|second|third ', ' fourth|fifth '];

            const result = splitAtFirstComma(initial);

            expect(result).toEqual(expected);
        });
    });

    describe.concurrent('string does not contain delimiter', async () => {
        it.concurrent(
            'should return the original text in the before position of the tuple returned',
            async ({ expect }) => {
                const splitAtFirstComma = splitAtFirst(',');
                const initial = 'first second third fourth fifth';

                const [before, _after] = splitAtFirstComma(initial);

                expect(before).toEqual(initial);
            }
        );

        it.concurrent(
            'should return falsy in the after position of the returned tuple',
            async ({ expect }) => {
                const splitAtFirstComma = splitAtFirst(',');
                const initial = 'first second third fourth fifth';

                const [_before, after] = splitAtFirstComma(initial);

                expect(after).toBeFalsy();
            }
        );
    });
});
