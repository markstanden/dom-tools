/**
 * removes the preceding dot, if present, from a css selector and returns the classname.
 * if a classname is provided without the initial dot, it is returned unaltered.
 * @param {string} cssClassname
 * @returns {string} the html classname
 */
export function asClassname(cssClassname: string): string {
    const hasDot = cssClassname && cssClassname[0] === '.';
    return hasDot ? cssClassname.slice(1) : cssClassname;
}
