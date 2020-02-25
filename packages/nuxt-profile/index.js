import { resolve, join } from 'path'
import { copySync } from 'fs-extra'

const meta = require('./package.json')

function AwesIoNuxtAuth() {
    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/nuxt-profile')

    // Register routes
    this.extendRoutes((routes = {}) => {
        routes.unshift({
            path: '/profile',
            component: resolve(__dirname, './src/pages/Profile.vue'),
            children: [
                {
                    name: 'profile-security',
                    path: 'security',
                    component: resolve(
                        __dirname,
                        './src/pages/ProfileSecurity.vue'
                    )
                },
                {
                    name: 'profile-settings',
                    path: '',
                    component: resolve(
                        __dirname,
                        './src/pages/ProfileSettings.vue'
                    )
                }
            ]
        })
    })

    // Add nuxt plugin in the end
    const { dst } = this.addTemplate({
        src: resolve(__dirname, './src/assets/js/plugin.js'),
        fileName: join('awes-io', 'profile-plugin.js')
    })
    this.options.plugins.push({
        src: join(this.options.buildDir, dst)
    })

    // Add localization
    const langPlugin = this.addTemplate({
        fileName: join('awes-io', 'profile-i18n-plugin.js'),
        src: resolve(__dirname, '../ui/nuxt/i18n-plugin.js'),
        options: { moduleName: meta.name }
    })
    this.options.plugins.push(join(this.options.buildDir, langPlugin.dst))

    // Copy avatar placeholder
    copySync(
        resolve(__dirname, './src/assets/img/avatar.jpg'),
        resolve(this.options.srcDir, 'static/img/awes-io-avatar.jpg'),
        { overwrite: false }
    )
}

AwesIoNuxtAuth.meta = meta

export default AwesIoNuxtAuth
