import langDefault from '<%= options.moduleName %>/lang/en'
import { mergeDeep } from 'rambdax'

const LOCALE_DEFAULT = 'en'

export default async function({ app: { i18n } }) {
    // cache object
    const LANGS = {}

    // check cache
    function isLangLoaded(locale) {
        return locale in LANGS
    }

    // loading function
    async function loadTranslation(locale) {
        if (!isLangLoaded(locale)) {
            let lang = langDefault

            try {
                // lazy load if locale is not default
                if (locale !== LOCALE_DEFAULT) {
                    const loadedLang = await import(
                        /* webpackChunkName: "<%= options.moduleName %>-lang-[request]" */ '<%= options.moduleName %>/lang/' +
                            locale
                    )

                    // merge in case some translations missing
                    lang = mergeDeep(lang, loadedLang.default || loadedLang)
                }
            } catch (e) {
                console.log(
                    `Error loading <%= options.moduleName %> ${locale} localization`,
                    e
                )
            } finally {
                // save cache
                LANGS[locale] = lang
            }
        }

        return LANGS[locale]
    }

    async function setTranslations(locale) {
        if (!isLangLoaded(locale)) {
            const existing = i18n.getLocaleMessage(locale)
            const translation = await loadTranslation(locale)

            i18n.setLocaleMessage(locale, mergeDeep(translation, existing))
        }
    }

    // on switch
    const _oldOnLanguageSwitched = i18n.onLanguageSwitched
    i18n.onLanguageSwitched = async (oldLocale, newLocale) => {
        await _oldOnLanguageSwitched(oldLocale, newLocale)
        await setTranslations(newLocale)
    }

    // initial set
    await setTranslations(i18n.locale)
}
