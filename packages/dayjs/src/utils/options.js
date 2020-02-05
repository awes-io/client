import { pathOr } from 'rambdax'
import { normalizeStringFormat } from './string-format'
import { normalizePlugins } from './plugins'
import { extractLocales } from './locales'

export const DEFAULT_OPTIONS = {
    stringFormat: {
        pattern: null,
        format: true
    },
    plugins: ['dayjs/plugin/customParseFormat', 'dayjs/plugin/localizedFormat']
}

export function normalizeOptions(globals, module) {
    const globalDayjsOptions = pathOr({}, 'awesIo.dayjs', globals)

    return {
        stringFormat: normalizeStringFormat(
            DEFAULT_OPTIONS,
            globalDayjsOptions,
            module
        ),
        plugins: normalizePlugins([
            ...DEFAULT_OPTIONS.plugins,
            ...(globalDayjsOptions.plugins || []),
            ...(module.plugins || [])
        ]),
        locales: extractLocales(globals)
    }
}
