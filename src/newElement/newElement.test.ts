import { describe } from 'vitest';
import { newElement } from './newElement.js';
// @vitest-environment happy-dom

describe.concurrent('newElement Tests', () => {
    describe.concurrent('returns a new element of the required type', () => {
        it.concurrent('returns a div', async ({ expect }) => {
            const elementType = 'div';

            const element = newElement<HTMLDivElement>(elementType);

            expect(element.tagName).toEqual('DIV');
        });

        it.concurrent('returns a button', async ({ expect }) => {
            const elementType = 'button';

            const element = newElement<HTMLButtonElement>(elementType);

            expect(element.tagName).toEqual('BUTTON');
        });
    });

    describe.concurrent('it adds the classnames to the element', () => {
        it.concurrent('adds a single class', async ({ expect }) => {
            const elementType = 'div';
            const className = 'test';

            const element = newElement(elementType, className);

            expect(element.className).toEqual(className);
        });

        it.concurrent('adds multiple classnames', async ({ expect }) => {
            const elementType = 'div';
            const className1 = 'to-test';
            const className2 = 'testing';
            const className3 = 'tested';

            const element = newElement<HTMLButtonElement>(
                elementType,
                className1,
                className2,
                className3
            );

            expect(element.classList).toContain(className1);
            expect(element.classList).toContain(className2);
            expect(element.classList).toContain(className3);
        });

        it.concurrent(
            'removes a preceding dot from provided classname',
            async ({ expect }) => {
                const elementType = 'div';
                const providedClassName = '.test';
                const expectedClassName = 'test';

                const element = newElement(elementType, providedClassName);

                expect(element.className).toEqual(expectedClassName);
            }
        );

        it.concurrent(
            'automatically removes preceding dots from multiple classnames',
            async ({ expect }) => {
                const elementType = 'div';
                const providedClassName1 = '.to-test';
                const providedClassName2 = '.testing';
                const providedClassName3 = '.tested';
                const expectedClassName1 = 'to-test';
                const expectedClassName2 = 'testing';
                const expectedClassName3 = 'tested';

                const element = newElement<HTMLButtonElement>(
                    elementType,
                    providedClassName1,
                    providedClassName2,
                    providedClassName3
                );

                expect(element.classList).toContain(expectedClassName1);
                expect(element.classList).toContain(expectedClassName2);
                expect(element.classList).toContain(expectedClassName3);
            }
        );
    });
});
