import Vue from 'vue'

function addMenuItem(state, { key, children = [], parent, ...params }) {
    if (parent) {
        state.menu[parent].children.push({ ...params })
    } else if (key) {
        Vue.set(state.menu, key, { children, ...params })
    }
}

export default {
    SET_USER_MENU_ITEM(state, { key, order = 1, item }) {
        item.order = order
        state.userMenu[key] = item
    },

    SET_USER_MENU_ADDITIONAL_ITEM(state, { key, order = 1, item }) {
        item.order = order
        state.userMenuAdditional[key] = item
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
    }
}
