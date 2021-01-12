import Vue from 'vue'
import { pathOr, pick, isType } from 'rambdax'

const castArray = (val) => (Array.isArray(val) ? val : [])

const getRouteData = pick('name,path,fullPath,query,hash,params')

export const state = () => ({
    route: {
        path: '/'
    },

    menus: {
        main: [],
        secondary: [],
        user: []
    },
    mobileMenuOpened: false,
    can: () => true,

    headerNotification: null,

    isDarkTheme: false
})

export const getters = {
    mainMenu(state) {
        return castArray(state.menus.main)
    },

    secondaryMenu(state) {
        return castArray(state.menus.secondary)
    },

    userMenu(state) {
        return castArray(state.menus.user)
    },

    user(state, getters, rootState) {
        const user = pathOr({}, 'auth.user', rootState)
        const src = pathOr('', 'avatar', user)
        const name = [
            pathOr('', 'profile.first_name', user),
            pathOr('', 'profile.last_name', user)
        ]
            .filter(Boolean)
            .join(' ')
        const description = pathOr(
            pathOr('', 'profile.description', user),
            'profile.position',
            user
        )

        if (src || name || description) {
            return { src, name, description }
        }

        return null
    },

    isDarkTheme: pathOr(false, 'isDarkTheme')
}

export const mutations = {
    SET(state, payload) {
        for (let key in payload) {
            state[key] = payload[key]
        }
    },

    SET_ROUTE(state, payload) {
        state.mobileMenuOpened = false
        state.route = {
            ...getRouteData(payload[0]),
            prev: getRouteData(payload[1])
        }
    },

    SET_MENU_ITEMS(state, menus) {
        if (!isType('Object', menus)) return

        for (const key in menus) {
            Vue.set(state.menus, key, menus[key])
        }
    },

    SET_HEADER_NOTIFICATION(state, data = null) {
        state.headerNotification = data
    },

    SET_DARK_THEME(state, isDarkTheme = false) {
        state.isDarkTheme = isDarkTheme
    },

    TOGGLE_MOBILE_MENU(state, status = !state.mobileMenuOpened) {
        state.mobileMenuOpened = Boolean(status)
    }
}

export default {
    state,
    getters,
    mutations,
    namespaced: true
}
