import { describe, vi } from 'vitest';
import { peek } from './peek.js';

const getMockLogger = () => vi.fn(() => (..._logItem: unknown[]): void => {});

describe('peek', () => {
    it.concurrent('should not affect passed arguments', async ({ expect }) => {
        const logger = getMockLogger();
        const _peek = peek('String', logger);
        const initial = ['first', 'second', 'third', 'fourth', 'fifth'];
        const expected = initial;

        const result = initial.map(_peek);

        expect(result).toEqual(expected);
    });

    it.concurrent(
        'does not affect multiple arguments passed as a tuple',
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek('Tuple', logger);
            const initial = [
                ['first', 'firstVal'],
                ['second', 'secondVal'],
                ['third', 'thirdVal'],
                ['fourth', 'fourthVal'],
                ['fifth', 'fifthVal'],
            ];
            const expected = initial;

            const result = initial.map(_peek);

            expect(result).toEqual(expected);
        }
    );

    it.concurrent(
        'does not affect multiple arguments passed as an object ',
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek('Object', logger);
            const initial = [
                { first: 'firstVal' },
                { second: 'secondVal' },
                { third: 'thirdVal' },
                { fourth: 'fourthVal' },
                { fifth: 'fifthVal' },
            ];
            const expected = initial;

            const result = initial.map(_peek);

            expect(result).toEqual(expected);
        }
    );

    it.concurrent('calls the logger once per item', async ({ expect }) => {
        const logger = getMockLogger();
        const _peek = peek('String', logger);
        const initial = ['first', 'second', 'third', 'fourth', 'fifth'];

        initial.map(_peek);

        expect(logger).toHaveBeenCalledTimes(5);
    });

    it.concurrent('adds the prefix to the log', async ({ expect }) => {
        const logger = getMockLogger();
        const prefix = 'Test';
        const _peek = peek(prefix, logger);
        const initial = ['first', 'second', 'third'];

        initial.map(_peek);

        expect(logger).toHaveBeenNthCalledWith(1, 'Test:', 'first');
        expect(logger).toHaveBeenNthCalledWith(2, 'Test:', 'second');
        expect(logger).toHaveBeenNthCalledWith(3, 'Test:', 'third');
    });

    it.concurrent(
        "doesn't add an empty string prefix to the log",
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek(undefined, logger);
            const initial = ['first', 'second', 'third', 'fourth', 'fifth'];

            initial.map(_peek);

            expect(logger).toHaveBeenNthCalledWith(1, 'first');
            expect(logger).toHaveBeenNthCalledWith(2, 'second');
            expect(logger).toHaveBeenNthCalledWith(3, 'third');
            expect(logger).toHaveBeenNthCalledWith(4, 'fourth');
            expect(logger).toHaveBeenNthCalledWith(5, 'fifth');
        }
    );

    it.concurrent(
        'works with a prefix when multiple arguments are passed as a tuple',
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek('Tuple', logger);
            const initial = [
                ['first', 'firstVal'],
                ['second', 'secondVal'],
                ['third', 'thirdVal'],
            ];

            initial.map(_peek);

            expect(logger).toHaveBeenNthCalledWith(1, 'Tuple:', [
                'first',
                'firstVal',
            ]);
            expect(logger).toHaveBeenNthCalledWith(2, 'Tuple:', [
                'second',
                'secondVal',
            ]);
            expect(logger).toHaveBeenNthCalledWith(3, 'Tuple:', [
                'third',
                'thirdVal',
            ]);
        }
    );

    it.concurrent(
        'works without a prefix when multiple arguments are passed as a tuple',
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek(undefined, logger);
            const initial = [
                ['first', 'firstVal'],
                ['second', 'secondVal'],
                ['third', 'thirdVal'],
            ];

            initial.map(_peek);

            expect(logger).toHaveBeenNthCalledWith(1, ['first', 'firstVal']);
            expect(logger).toHaveBeenNthCalledWith(2, ['second', 'secondVal']);
            expect(logger).toHaveBeenNthCalledWith(3, ['third', 'thirdVal']);
        }
    );
});
