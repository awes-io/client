import { isFalsy, mergeDeep, filter, toPairs } from 'rambdax'

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
    const _query = cleanRouteQuery(query)
    const _routeQuery = cleanRouteQuery(route.query)

    // non-strict values comparation, because of different types of default string parsing
    return toPairs(_query).every(([key, value]) => _routeQuery[key] == value)
}

/**
 * Trims slash from url
 *
 * @param  {String} path - url to modify
 *
 * @return {String} - modified url
 */
export function trimSlash(path = '') {
    if (typeof path !== 'string') {
        throw new TypeError('Path must be a string')
    }

    const [_path, _query] = path.split('?')

    return _path.replace(/\/$/, '') + (_query ? `?${_query}` : '')
}
