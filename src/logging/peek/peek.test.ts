import { describe, vi } from 'vitest';
import { peek } from './peek.js';

const getMockLogger = () => vi.fn(() => (..._logItem: any[]): void => {});

describe('peek', () => {
    it.concurrent('should not affect passed arguments', async ({ expect }) => {
        const _peek = peek('String');
        const initial = ['first', 'second', 'third', 'fourth', 'fifth'];
        const expected = initial;

        const result = initial.map(_peek);

        expect(result).toEqual(expected);
    });

    it.concurrent(
        'does not affect multiple arguments passed as a tuple',
        async ({ expect }) => {
            const _peek = peek('Tuple');
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
            const _peek = peek('Object');
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

        expect(logger).toHaveBeenCalledWith('Test:', 'first');
        expect(logger).toHaveBeenCalledWith('Test:', 'second');
        expect(logger).toHaveBeenCalledWith('Test:', 'third');
    });

    it.concurrent(
        "doesn't add an empty string prefix to the log",
        async ({ expect }) => {
            const logger = getMockLogger();
            const _peek = peek(undefined, logger);
            const initial = ['first', 'second', 'third', 'fourth', 'fifth'];

            initial.map(_peek);

            expect(logger).toHaveBeenCalledWith('first');
            expect(logger).toHaveBeenCalledWith('second');
            expect(logger).toHaveBeenCalledWith('third');
            expect(logger).toHaveBeenCalledWith('fourth');
            expect(logger).toHaveBeenCalledWith('fifth');
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

            expect(logger).toHaveBeenCalledWith('Tuple:', [
                'first',
                'firstVal',
            ]);
            expect(logger).toHaveBeenCalledWith('Tuple:', [
                'second',
                'secondVal',
            ]);
            expect(logger).toHaveBeenCalledWith('Tuple:', [
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

            expect(logger).toHaveBeenCalledWith(['first', 'firstVal']);
            expect(logger).toHaveBeenCalledWith(['second', 'secondVal']);
            expect(logger).toHaveBeenCalledWith(['third', 'thirdVal']);
        }
    );
});
