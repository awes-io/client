import { pathOr } from 'rambdax'

function extractStringFormat(options) {
    const stringFormat = pathOr({}, 'stringFormat', options)

    return typeof stringFormat === 'string'
        ? { pattern: stringFormat }
        : stringFormat
}

export function normalizeStringFormat(defaults, globals, module) {
    return {
        ...defaults.stringFormat,
        ...extractStringFormat(globals),
        ...extractStringFormat(module)
    }
}
