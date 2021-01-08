import { sortBy, prop, pathOr, toPairs, pick, isType } from 'rambdax'
import { getPath } from '../assets/js/router'

const sortByOrder = sortBy(prop('order'))

const getRouteData = pick('name,path,fullPath,query,hash,params')

const filterChildrenByPermission = (can, children = []) => {
    return children.reduce((acc, item) => {
        const show = isType('Function', item.show) ? item.show(can) : item.show

        if (show === false) {
            return acc
        }

        return item.children
            ? acc.concat({
                  ...item,
                  children: filterChildrenByPermission(can, item.children)
              })
            : acc.concat(item)
    }, [])
}

const _flatChildrenHrefs = (children) => {
    return children.reduce((acc, { children, is_active, href }) => {
        return children && children.length
            ? acc.concat(_flatChildrenHrefs(children))
            : href
            ? is_active
                ? [href].concat(acc)
                : acc.concat(href)
            : acc
    }, [])
}

const findHref = (children = []) => {
    return _flatChildrenHrefs(children)[0] || null
}

const findCurrent = (currentPath, children = [], parent = null) => {
    const length = children.length
    let current = null
    let i = 0

    while (i < length && current === null) {
        const item = children[i]

        if (item.children && item.children.length) {
            const subLevel = findCurrent(currentPath, item.children, item)

            if (subLevel.current) {
                return subLevel
            }
        } else if (getPath(item.href) === currentPath) {
            current = item
            break
        }

        i++
    }

    if (current && parent && getPath(parent.href) === getPath(current.href)) {
        parent = null
    }

    return { current, parent }
}

export const state = () => ({
    route: {
        path: '/'
    },

    menu: {},
    mobileMenuOpened: false,
    userMenu: {},
    serviceMenu: {},
    can: () => true,

    headerNotification: null,

    isDarkTheme: false
})

export const getters = {
    menu(state) {
        return filterChildrenByPermission(
            state.can,
            sortByOrder(
                toPairs(state.menu).map(([key, item]) => ({
                    ...item,
                    href:
                        item.children && item.children.length
                            ? findHref(item.children)
                            : item.href,
                    key
                }))
            )
        )
    },

    currentPage(state, { menu }) {
        return findCurrent(getPath(state.route), menu)
    },

    activeMenu(state, { menu, currentPage }) {
        if (currentPage.current) {
            const currentHref = currentPage.current.href

            return menu.find(({ href, children }) =>
                children
                    ? _flatChildrenHrefs(children).some(
                          (href) => href === currentHref
                      )
                    : href === currentHref
            )
        }

        return null
    },

    userMenu(state) {
        return sortByOrder(
            toPairs(state.userMenu).map(([key, item]) => ({
                ...item,
                key
            }))
        )
    },

    serviceMenu(state) {
        return sortByOrder(
            toPairs(state.serviceMenu).map(([key, item]) => ({
                ...item,
                key
            }))
        )
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

    SET_MENU_ITEMS(state, menu) {
        state.menu = menu
    },

    MERGE_MENU_ITEMS(state, items) {
        state.menu = {
            ...state.menu,
            ...items
        }
    },

    SET_USER_MENU_ITEM(state, { key, order = 1, item }) {
        item.order = order
        state.userMenu[key] = item
    },

    SET_SERVICE_MENU_ITEMS(state, serviceMenu) {
        state.serviceMenu = serviceMenu
    },

    MERGE_SERVICE_MENU_ITEMS(state, items) {
        state.serviceMenu = {
            ...state.serviceMenu,
            ...items
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
