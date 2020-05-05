/* eslint-disable */
import Vue from 'vue'
import { pathOr, sortBy, values, mergeDeep } from 'rambdax'


import AwesUI from '@awes-io/ui'
import config from '@awes-io/ui/nuxt/ui-config.js'
import { state, mutations } from '@awes-io/ui/nuxt/store'

const componentsConfig = <%= JSON.stringify(options.components) %>

Vue.use(AwesUI, mergeDeep(config, componentsConfig))

export default ({ store, app }) => {
    if (!store.awesIo) {
        store.registerModule('awesIo', {
            state,
            mutations,
            getters: {
                userMenu: (state) => sortBy(
                    pathOr(Infinity, 'order'),
                    values(pathOr({}, 'userMenu', state))
                ),
                userMenuAdditional: (state) => sortBy(
                    pathOr(Infinity, 'order'),
                    values(pathOr({}, 'userMenuAdditional', state))
                ),
                navbarMenu: (state) => sortBy(
                    pathOr(Infinity, 'order'),
                    values(pathOr({}, 'navbarMenu', state))
                ),
                isHeaderNotificationShown: (state) => state.headerNotification.show,
                mainMenu: (state, { permissionsGranted }) => {
                    return sortBy(
                        pathOr(Infinity, ['order']),
                        values(pathOr({}, 'menu', state))
                    )
                }
            },
            namespaced: true
        })
    }
}
