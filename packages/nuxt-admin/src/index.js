import { resolve, join } from 'path'

const meta = require('../package.json')

function AwesIoNuxtAdmin() {
    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/nuxt-admin')

    // Register routes
    this.extendRoutes((routes = {}) => {
        routes.unshift({
            path: '/admin',
            component: resolve(__dirname, './pages/admin.vue'),
            children: [
                {
                    name: 'admin-settings',
                    path: 'settings',
                    component: resolve(__dirname, './pages/admin/settings.vue')
                },
                {
                    name: 'admin-information',
                    path: '',
                    component: resolve(__dirname, './pages/admin/index.vue')
                }
            ]
        })
    })

    // Add localization
    const langPlugin = this.addTemplate({
        fileName: join('awes-io', 'admin-i18n-plugin.js'),
        src: resolve(__dirname, '../../ui/nuxt/i18n-plugin.js'),
        options: { moduleName: meta.name }
    })
    this.options.plugins.push(join(this.options.buildDir, langPlugin.dst))
}

AwesIoNuxtAdmin.meta = meta

export default AwesIoNuxtAdmin
