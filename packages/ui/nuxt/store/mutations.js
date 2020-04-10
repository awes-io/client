import Vue from 'vue'

function addMenuItem(state, { key, children = [], parent, ...params }) {
    if (parent) {
        state.menu[parent].children.push({ ...params })
    } else if (key) {
        Vue.set(state.menu, key, { children, ...params })
    }
}

function addNavbarItem(state, { key, order = 1, item }) {
    item.order = order
    Vue.set(state.navbarMenu, key, item)
}

export default {
    SET_USER_MENU_ITEM(state, { key, order = 1, item }) {
        item.order = order
        state.userMenu[key] = item
    },

    SET_NAVBAR_ITEM(state, items) {
        Array.isArray(items)
            ? items.forEach(item => {
                  addNavbarItem(state, item)
              })
            : addNavbarItem(state, items)
    },

    SET_MENU_ITEM(state, items) {
        Array.isArray(items)
            ? items.forEach(item => {
                  addMenuItem(state, item)
              })
            : addMenuItem(state, items)
    },

    CLOSE_HEADER_NOTIFICATION(state) {
        state.headerNotification.show = false
    },

    SET_DARK_THEME(state, isDarkTheme = false) {
        state.isDarkTheme = isDarkTheme
    }
}
