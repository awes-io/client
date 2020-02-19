function toggleHeader($axios, locales, currentLocale) {
    const locale = locales.find(({ code }) => code === currentLocale)

    if (locale.iso) {
        $axios.defaults.headers.common['Accept-Language'] = locale.iso
    } else {
        delete $axios.defaults.headers.common['Accept-Language']
    }
}

export default function({ app, $axios }) {
    // toggle first time
    toggleHeader($axios, app.i18n.locales, app.i18n.locale)

    // set listener on language switch
    const _oldBeforeLanguageSwitch = app.i18n.beforeLanguageSwitch
    app.i18n.beforeLanguageSwitch = async (oldLocale, newLocale) => {
        await _oldBeforeLanguageSwitch
        toggleHeader($axios, app.i18n.locales, newLocale)
    }
}
