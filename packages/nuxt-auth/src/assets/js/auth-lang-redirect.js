export default ({ app }) => {
    const redirect = app.$auth.$storage.options.redirect
    const locale = /* app.i18n.getLocaleCookie() || */ app.i18n.locale

    for (var key in redirect) {
        redirect[key] = app.localePath({ path: redirect[key] }, locale)
    }

    app.$auth.$storage.options.redirect = redirect
}
