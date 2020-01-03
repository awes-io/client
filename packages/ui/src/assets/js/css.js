export const camelCase = str => {
    return str.replace(/[-_]([a-z])/g, m => m[1].toUpperCase())
}

/**
 * Create BEM-like clesses for given elements of the given block
 * @param  {String}        block block name
 * @param  {Array<String>} els   element names
 * @return {Array<String>}        classnames
 */
export function getBemClasses(block, els = []) {
    let _cls = {}

    els.forEach(el => {
        _cls[camelCase(el)] = `${block}__${el}`
    })

    return _cls
}
