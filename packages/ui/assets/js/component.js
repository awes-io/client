import { path, pathOr, mergeDeep } from 'rambdax'

export const CONFIG_VAR = '$awesConfig'

export const CONFIG_PATH = [CONFIG_VAR]

/**
 * Get config value
 *
 * First searches in global config, then in component config
 *
 * @param  {Object} thisArg component context
 * @param  {String} val     param name
 * @param  {*}      def     value by default
 * @return {*}              value or given default
 */
export function conf(thisArg, val, def) {
    return pathOr(
        pathOr(def, ['$options', '_config', val], thisArg),
        [CONFIG_PATH, path('$options.name', thisArg), val],
        thisArg
    )
}

export function setConfig(_vue, config = {}) {
    _vue.prototype[CONFIG_VAR] = mergeDeep(
        config,
        pathOr({}, CONFIG_PATH, _vue.prototype)
    )
}
