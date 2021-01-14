import Vue from 'vue'
import VueI18n from 'vue-i18n'
import JsCookie from 'js-cookie'
import { omit, isType, prop, mergeDeepRight } from 'rambdax'

Vue.use(VueI18n)

const cyrillicPluralization = (choice, choicesLength) => {
    if (choice === 0) {
        return 0
    }

    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1

    if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2
    }
    if (!teen && endsWithOne) {
        return 1
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
    }

    return choicesLength < 4 ? 2 : 3
}

const langOptions = JSON.parse('<%= JSON.stringify(options.lang) %>')

const messages = JSON.parse(`<%= JSON.stringify(options.langStatic).replace(/\\"/g, "'") %>`)

/* eslint-disable-next-line */
const fetchTranslation = <%= options.lang.fetchTranslation %>

const langCookie = langOptions.langCookie

const i18nOptions = mergeDeepRight(
    {
        pluralizationRules: {
            ru: cyrillicPluralization,
            uk: cyrillicPluralization
        }
    },
    omit(
        ['locales', 'fetchTranslation', 'langCookie', 'static'],
        langOptions
    )
)

i18nOptions.messages = mergeDeepRight(messages, i18nOptions.messages || {})

const beforeListeners = new Map()
const afterListeners = new Map()

export default async ({ app }) => {
    const locales = langOptions.locales.slice().map(locale => {
        if (isType('String', locale)) {
            return { code: locale }
        }

        return locale
    })
    const localeCodes = locales.map(prop('code'))

    app.i18n = app.i18n || new VueI18n(i18nOptions)
    app.i18n.locales = locales

    /**
     * Add locale switch listeners
     */
    app.i18n.beforeLanguageSwitch = (fn) => {
        if (!isType('Function', fn)) return

        const remove = () => {
            beforeListeners.delete(fn)
        }

        beforeListeners.set(fn, remove)

        return remove
    }

    app.i18n.onLanguageSwitched = (fn) => {
        if (!isType('Function', fn)) return

        const remove = () => {
            afterListeners.delete(fn)
        }

        afterListeners.set(fn, remove)

        return remove
    }

    /**
     * Detect browser language
     */
    let _browserLang = navigator.language

    if (!localeCodes.includes(_browserLang)) {
        _browserLang = navigator.languages.find(locale =>
            localeCodes.includes(locale)
        )
    }

    /**
     * Restore saved lang
     */
    if (langCookie) {
        const saved = JsCookie.get(langCookie)

        if (saved && localeCodes.includes(saved) && app.i18n.locale !== saved) {
            app.i18n.locale = saved
        } else if (_browserLang) {
            app.i18n.locale = _browserLang
            JsCookie.set(langCookie, _browserLang)
        } else {
            JsCookie.set(langCookie, i18nOptions.locale)
        }
    }

    /**
     * Fetch translation from server
     */
    let fetchLocale = () => ({})

    if (fetchTranslation) {
        const loadedLocales = {}

        fetchLocale = async (locale) => {
            if (loadedLocales[locale]) return loadedLocales[locale]

            const requestConfig = isType('Function', fetchTranslation)
                ? fetchTranslation(locale)
                : { url: fetchTranslation }

            try {
                const { data } = await app.$axios.request(requestConfig)
                loadedLocales[locale] = data
            } catch (e) {
                console.log('Error fetching translation', e)
            } finally {
                return loadedLocales[locale] || {}
            }
        }
    }

    /**
     * Global setLocale function
     */
    app.i18n.setLocale = async locale => {
        const oldLocale = app.i18n.locale

        for (const beforeListener of beforeListeners.keys()) {
            await beforeListener(locale, oldLocale)
        }

        const fetchedData = await fetchLocale(locale)

        app.i18n.setLocaleMessage(
            locale,
            mergeDeepRight(app.i18n.getLocaleMessage(locale), fetchedData)
        )

        app.i18n.locale = locale

        if (langCookie) {
            JsCookie.set(langCookie, locale)
        }

        for (const afterListener of afterListeners.keys()) {
            await afterListener(locale, oldLocale)
        }
    }

    /**
     * Set language on init
     */
    if (app.$axios) {
        await app.i18n.setLocale(app.i18n.locale)
    } else {
        window.onNuxtReady(() => app.i18n.setLocale(app.i18n.locale))
    }
}
