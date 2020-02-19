import { pathOr, path, omit, keys, hasPath, uniq } from 'rambdax'
import { relative, join } from 'path'

const MODULE_DEFAULTS = {
    url: '/api/translations/?locale={locale}',
    dataPath: 'data'
}

const isoLocaleRegex = /^[a-z]{2}-[A-Z]{2}$/

function getLangFileName(localeCode) {
    return `/translations-${localeCode}.js`
}

function validateNuxtI18nOptions(mergedOptions) {
    if (mergedOptions.locales.length === 0) {
        throw new Error('@awes-io/nuxt-i18n: locales are not provided')
    }

    if (
        !mergedOptions.locales.every(
            locale => typeof locale === 'string' || !!locale.code
        )
    ) {
        throw new Error(
            '@awes-io/nuxt-i18n: locales show contain `code` property or be a string'
        )
    }

    if (
        mergedOptions.locales.some(hasPath('domain')) &&
        !mergedOptions.locales.every(hasPath('domain'))
    ) {
        console.warn(
            '@awes-io/nuxt-i18n: not all locales have `domain` property'
        )
    }
}

function normalizeNuxtI18nOptions(options) {
    // remove local module config
    options = omit(keys(MODULE_DEFAULTS), options)

    // provide single translation file for all locales
    const locales = options.locales.map(locale => {
        locale = typeof locale === 'string' ? { code: locale } : locale

        if (isoLocaleRegex.test(locale.code)) {
            locale.iso = locale.code
            locale.code = locale.code.split('-')[0]
        }

        return {
            ...locale,
            file: getLangFileName(locale.code)
        }
    })

    // detect multi-domain
    const differentDomains = pathOr(
        locales.every(hasPath('domain')),
        'differentDomains',
        options
    )

    // provide default locales or first
    const defaultLocale = pathOr(locales[0].code, 'defaultLocale', options)

    return {
        ...options,
        locales,
        differentDomains,
        defaultLocale,
        lazy: true
    }
}

export function addNuxtI18nOptions(globalOptions, moduleOptions) {
    const i18nOptions = pathOr({}, 'i18n', globalOptions)
    const awesIoNuxtI18nOptions = pathOr({}, 'awesIo.nuxtI18n', globalOptions)

    // set lang dir to build dir
    const langDir = relative(
        globalOptions.srcDir,
        join(globalOptions.buildDir, 'awes-io', 'lang')
    )

    const mergedOptions = {
        ...awesIoNuxtI18nOptions,
        ...moduleOptions,
        ...i18nOptions,
        locales: uniq([
            ...pathOr([], 'locales', awesIoNuxtI18nOptions),
            ...pathOr([], 'locales', moduleOptions),
            ...pathOr([], 'locales', i18nOptions)
        ]),
        langDir
    }

    validateNuxtI18nOptions(mergedOptions)

    // set nuxt-i18n to global options
    globalOptions.i18n = normalizeNuxtI18nOptions(mergedOptions)
}

function getBaseDomain(options) {
    const host = path('server.host', options)
    const port = path('server.port', options)

    return `${host}:${port}`
}

function getDomainFromUrl(url) {
    return url.split('/')[2]
}

export function getTemplateOptions(globalOptions, moduleOptions) {
    const awesIoNuxtI18nOptions = pathOr({}, 'awesIo.nuxtI18n', globalOptions)

    const options = {
        ...MODULE_DEFAULTS,
        ...awesIoNuxtI18nOptions,
        ...moduleOptions,
        isHttps: !!pathOr(false, 'server.https', globalOptions)
    }

    const baseUrl =
        options.url.indexOf('//') !== -1
            ? getBaseDomain(globalOptions)
            : getDomainFromUrl(options.url)

    options.locales = pathOr([], 'i18n.locales', globalOptions).map(
        ({ file, code, domain = baseUrl }) => ({
            file,
            code,
            domain
        })
    )

    if (!options.url) {
        throw new Error('@awes-io/nuxt-i18n: url is required')
    }

    return options
}
