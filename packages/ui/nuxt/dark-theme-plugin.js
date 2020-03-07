import Cookies from 'cookies'
import JsCookie from 'js-cookie'
import { isNil, isType, pathOr } from 'rambdax'

const COOKIE_NAME = 'AW_THEME_DARK'

export default function(ctx) {
    const { store } = ctx

    if (process.server) {
        const { req, res } = ctx
        const cookies = new Cookies(req, res)
        let isDark = cookies.get(COOKIE_NAME)

        if (isType('String', isDark)) {
            try {
                isDark = JSON.parse(isDark)
            } catch (e) {
                isDark = false
                console.log(e)
            }
        }

        if (
            !isNil(isDark) &&
            pathOr(false, 'state.awesIo.isDarkTheme', store) !== isDark
        ) {
            store.commit('awesIo/SET_DARK_THEME', isDark)
        }
    }

    if (process.client) {
        let isDark = JsCookie.get(COOKIE_NAME)

        if (isNil(isDark)) {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            JsCookie.set(COOKIE_NAME, isDark)
        } else {
            isDark = JSON.parse(isDark)
        }

        if (store.state.awesIo.isDarkTheme !== isDark) {
            window.onNuxtReady(() => {
                store.commit('awesIo/SET_DARK_THEME', isDark)
            })
        }

        store.watch(
            state => state.awesIo.isDarkTheme,
            isDark => {
                JsCookie.set(COOKIE_NAME, isDark)
            }
        )
    }
}
