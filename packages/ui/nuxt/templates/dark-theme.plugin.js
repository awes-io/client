import JsCookie from 'js-cookie'
import { isNil, assoc } from 'rambdax'

const COOKIE_NAME = 'AW_THEME_DARK'

const ATTR = 'data-dark'

export default function({ store, app }) {
    /**
     * Detect dark theme
     */
    let isDark = JsCookie.get(COOKIE_NAME)

    if (isNil(isDark)) {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        JsCookie.set(COOKIE_NAME, isDark)
    } else {
        isDark = JSON.parse(isDark)
    }

    /**
     * Preset html attr
     */
    app.head = {
        ...app.head,
        htmlAttrs: assoc(ATTR, isDark, app.head.htmlAttrs || {})
    }

    /**
     * Sync store
     */
    if (store.getters['awesIo/isDarkTheme'] !== isDark) {
        store.commit('awesIo/SET_DARK_THEME', isDark)
    }

    store.watch(
        (state) => state.awesIo.isDarkTheme,
        (isDark) => {
            JsCookie.set(COOKIE_NAME, isDark)
        }
    )

    // window.onNuxtReady(() => {})
}
