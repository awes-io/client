import { resolve, join } from 'path'

const meta = require('../package.json')

function AwesIoNuxtAdmin() {
    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/nuxt-admin')

    // Register routes
    this.extendRoutes((routes = {}) => {
        routes.unshift(
            {
                path: '/admin/roles',
                component: resolve(__dirname, './pages/Roles.vue')
            },
            {
                path: '/admin/roles/create',
                component: resolve(__dirname, './pages/RoleCreate.vue')
            },
            {
                path: '/admin/roles/:id',
                component: resolve(__dirname, './pages/Role.vue'),
                children: [
                    {
                        name: 'role-permissions',
                        path: 'permissions',
                        component: resolve(__dirname, './pages/role/permissions.vue')
                    },
                    {
                        name: 'role-information',
                        path: '',
                        component: resolve(__dirname, './pages/role/index.vue')
                    }
                ]
            },
            {
                path: '/admin/users',
                component: resolve(__dirname, './pages/Users.vue')
            },
            {
                path: '/admin/users/create',
                component: resolve(__dirname, './pages/UserCreate.vue')
            }
        )
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
