/* eslint-disable */
import Vue from 'vue'
import { flip, pathOr, filter, sortBy, isEmpty, includes, all, values, reduce } from 'rambdax'


import AwesUI from '@awes-io/ui'
import config from '@awes-io/ui/nuxt/ui-config.js'
import { state, mutations } from '@awes-io/ui/nuxt/store'

const componentsConfig = <%= JSON.stringify(options.components) %>

Vue.use(AwesUI, { ...config, ...componentsConfig })

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
                mainMenu: (state, { permissionsGranted }) => {
                    return sortBy(
                        pathOr(Infinity, ['order']),
                        reduce(
                            (menu, item) => {
                                return permissionsGranted(item)
                                    ?   menu.concat({
                                            ...item,
                                            children: filter(permissionsGranted, item.children)
                                        })
                                    :   menu
                            },
                            [],
                            values(pathOr({}, 'menu', state))
                        )
                    )
                },
                permissions: (state, getters, rootState) => {
                    return pathOr([], '<%= options.permissions.storePath %>', rootState)
                },
                permissionsGranted: (state, { permissions }) => item => {
                    let routePermissions = pathOr([], ['permissions'], item)
                    routePermissions = Array.isArray(routePermissions) ? routePermissions : [routePermissions]
                    return isEmpty(routePermissions) ||
                        all(flip(includes)(permissions), routePermissions)
                }
            },
            namespaced: true
        })
    }
}
