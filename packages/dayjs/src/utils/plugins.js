import { isValid } from 'rambdax'

const PLUGIN_SCHEMA = { src: 'string', 'name?': 'string', 'options?': 'any' }

function getPluginNameFromSrc(src) {
    const filename = src.split('/').pop()

    return filename.replace(/\//, '')
}

function getCheckIsAdded(plugins) {
    return _src => plugins.findIndex(({ src }) => src === _src) > -1
}

export function normalizePlugins(plugins = []) {
    return plugins.reduce((acc, plugin) => {
        // current existence checker
        const checkIsAdded = getCheckIsAdded(acc)

        if (typeof plugin === 'string') {
            // do not add if already exists
            if (checkIsAdded(plugin)) {
                return acc
            }

            // format
            return acc.concat({
                src: plugin,
                name: getPluginNameFromSrc(plugin)
            })
        } else if (
            // validate plugin object
            isValid({ input: plugin, schema: PLUGIN_SCHEMA })
        ) {
            // do not add if already exists
            if (checkIsAdded(plugin.src)) {
                return acc
            }

            plugin.name = plugin.name || getPluginNameFromSrc(plugin.src)

            return acc.concat(plugin)
        } else {
            // skip plugin and show error
            console.error(
                `@awes-io/dayjs: unsupported plugin format ${JSON.stringify(
                    plugin
                )}, expected ${JSON.stringify(PLUGIN_SCHEMA)} or string`
            )
            return acc
        }
    }, [])
}
