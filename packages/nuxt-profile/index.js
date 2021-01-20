import { resolve } from 'path'

const meta = require('./package.json')

function AwesIoNuxtAuth() {
    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/nuxt-profile')

    // Register routes
    this.nuxt.hook('build:extendRoutes', (routes = []) => {
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

    this.nuxt.hook('awesIo:staticTranslations', async () => {
        for (const locale of this.options.awesIo.lang.locales) {
            const code = locale.code || locale

            try {
                const { default: translation } = await import(
                    '@awes-io/nuxt-profile/lang/' + code
                )

                for (const key in translation) {
                    this.options.awesIo.langStatic[code][key] = translation[key]
                }
            } catch (e) {
                console.warn(
                    'Awes.io/NuxtProfile: No default translation for ' +
                        code +
                        ' locale'
                )
            }
        }
    })
}

AwesIoNuxtAuth.meta = meta

export default AwesIoNuxtAuth
