import { pathOr, mergeDeepRight } from 'rambdax'
import { resolve, join } from 'path'
import { hasAwesIoUiModule } from './utils/options'

const meta = require('../package.json')

const DEFAULT_OPTIONS = {
    route: '/localization',
    endpoint: '/api/translations/edit',
    export: '',
    textLimit: 128,
    data: { default: {}, response: 'data' },
    errors: { default: {}, response: 'errors' },
    pagination: {
        page: { default: 1, request: 'page', response: 'meta.current_page' },
        limit: { default: 15, request: 'limit', response: 'meta.per_page' },
        total: { response: 'meta.total' }
    },
    search: { request: 'search' }
}

function AwesIoNuxtLocalization(_options = {}) {
    const options = pathOr({}, 'awesIo.nuxtLocalization', this.options)
    const mergedOptions = mergeDeepRight(
        DEFAULT_OPTIONS,
        mergeDeepRight(options, _options)
    )

    // trailing slash
    mergedOptions.route = mergedOptions.route.replace(/\/$/, '') + '/'
    mergedOptions.endpoint = mergedOptions.endpoint.replace(/\/$/, '')

    // Check UI is installed
    if (!hasAwesIoUiModule(this.options.modules)) {
        throw new Error('@awes-io/nuxt-localization: @awes-io/ui is required')
    }

    // Check store existance
    if (!this.options.store) {
        throw new Error('@awes-io/nuxt-localization: Vuex store is required')
    }

    // Add plugin
    this.addPlugin({
        src: resolve(__dirname, './plugins/nuxt-localization.js'),
        fileName: join('awes-io', 'nuxt-localization.js'),
        options: mergedOptions
    })

    // Add localization route
    this.nuxt.hook('build:extendRoutes', (routes = []) => {
        const route = {
            path: mergedOptions.route,
            component: resolve(__dirname, './pages/Localization.vue'),
            children: [
                {
                    path: 'add',
                    name: 'LocalizationAdd',
                    component: resolve(__dirname, './pages/LocalizationAdd.vue')
                },
                {
                    path: '',
                    name: 'LocalizationEdit',
                    component: resolve(
                        __dirname,
                        './pages/LocalizationEdit.vue'
                    )
                }
            ]
        }

        if (mergedOptions.export) {
            route.children.unshift({
                path: 'export',
                name: 'LocalizationExport',
                component: resolve(__dirname, './pages/LocalizationExport.vue')
            })
        }

        routes.unshift(route)
    })
}

AwesIoNuxtLocalization.meta = meta

export default AwesIoNuxtLocalization
