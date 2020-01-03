import { is, isFalsy } from 'rambdax'

/**
 * Removes empty values in object
 *
 * > Mutates given object
 *
 * @param  {Object} obj dirty object
 * @return {Object}     clean object
 */
export function clean(obj = {}) {
    // eslint-disable-next-line no-unused-vars
    for (let prop in obj) {
        if (isFalsy(obj[prop])) {
            delete obj[prop]
        }
        if (is(Object, obj[prop])) {
            clean(obj[prop])
        }
    }

    return obj
}
