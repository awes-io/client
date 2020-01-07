import { isFalsy, mergeDeep, filter, keys, pick, equals } from 'rambdax'

/**
 * Removes nullish values from query object
 *
 * @param  {Object} dirty query
 * @return {Object} clean query
 */
export const cleanRouteQuery = filter(val => !isFalsy(val))

/**
 * Returns merged query object without nullish values
 *
 * @param {Object} acceptor - query, that will be modified
 * @param {Object} donor - query, that will modify
 *
 * @return {Object} clean merged query
 */
export function mergeQueries(acceptor, donor) {
    return cleanRouteQuery(mergeDeep(donor, acceptor))
}

/**
 * Modifies VueRouter current route GET-params
 *
 * @param {Object<VueRouterRoute>} route - Vue-router instance from component
 *
 * @param {Object}                 query - params object. If param is set to `null`,
 *                                         `undefined`, or empty `String`,
 *                                         it will be deleted from query.
 *                                         To set param=null, pass a string `'null'`
 *
 * @return {Object<VueRouterRoute>} - merged route
 */

export function mergeRouteQuery(query, route) {
    return {
        ...route,
        query: mergeQueries(query, route.query)
    }
}

/**
 * Checks if given route has provided query params
 *
 * @param {Object<VueRouterRoute>} route - Vue-router instance from component
 *
 * @param {Object}                 query - params object.
 *
 * @return {Boolean} - true if has query
 */
export function hasRouteQuery(query, route) {
    return equals(
        pick(keys(query), cleanRouteQuery(route.query)),
        cleanRouteQuery(query)
    )
}
