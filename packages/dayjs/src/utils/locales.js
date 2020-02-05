import { pathOr } from 'rambdax'

export function extractLocales(options) {
    const locales = pathOr([], 'i18n.locales', options)

    const translations = locales.reduce((acc, locale) => {
        const { code } = locale

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
