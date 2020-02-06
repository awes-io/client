import { pathOr, uniq } from 'rambdax'

const isoLocaleRegex = /^[a-z]{2}-[A-Z]{2}$/

function getLocaleCode(locale) {
    let code = (typeof locale === 'string'
        ? locale
        : pathOr('', 'code', locale)
    ).trim()

    if (isoLocaleRegex.test(code)) {
        return code.split('-')[0]
    } else {
        return code.substr(0, 2)
    }
}

export function extractLocales(options) {
    const locales = uniq([
        ...pathOr([], 'awesIo.nuxtI18n.locales', options), // support @awes-io/nuxt-i18n module
        ...pathOr([], 'i18n.locales', options)
    ])

    const translations = locales.reduce((acc, locale) => {
        const code = getLocaleCode(locale)

        // skip default
        // if (locale === 'en') return acc

        if (code) {
            try {
                const path = `dayjs/locale/${code}`
                require.resolve(path)
                return acc.concat({ locale: code, path })
            } catch (e) {
                console.warning(
                    '@awes-io/dayjs: No translation for locale code',
                    code
                )
                return acc
            }
        } else {
            console.warning(
                '@awes-io/dayjs: No locale code provided for locale',
                locale
            )
            return acc
        }
    }, [])

    return translations
}
