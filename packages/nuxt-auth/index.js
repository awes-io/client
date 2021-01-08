import { resolve, join } from 'path'
import _ from 'lodash'
import { mergeRoutes } from './src/assets/js/merge-routes'

const meta = require('./package.json')

const twofactor = {
    _scheme: resolve(__dirname, './src/assets/js/strategy.js'),
    endpoints: {
        login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'meta.token'
        },
        logout: { url: '/api/logout', method: 'post' },
        verify: {
            url: '/api/login/twofactor/verify',
            method: 'post'
        },
        user: {
            url: '/api/me',
            method: 'get',
            propertyName: 'data'
        }
    }
}

function AwesIoNuxtAuth() {
    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/nuxt-auth')
    this.options.build.transpile.push('@nuxtjs/auth/lib/schemes/')

    // Add twofactor strategy
    _.set(this.options, 'auth.strategies.twofactor', twofactor)
    _.set(this.options, 'auth.defaultStrategy', 'twofactor')

    // Load @nuxtjs/auth module
    this.requireModule('@nuxtjs/auth')

    // Add auth middleware
    const _middleware = _.get(this.options, 'router.middleware')
    let middleware = ['auth']
    if (_middleware) {
        middleware = middleware.concat(
            Array.isArray(_middleware) ? _middleware : [_middleware]
        )
    }
    _.set(this.options, 'router.middleware', middleware)

    // Get register option from nuxt.config.js
    const isRegister = _.get(this.options, 'awesIo.nuxtAuth.register', true)

    // Get socialLogin option from nuxt.config.js
    const isSocialLogin = _.get(
        this.options,
        'awesIo.nuxtAuth.socialLogin',
        false
    )

    this.nuxt.hook('build:extendRoutes', (routes = []) => {
        const baseArr = [
            {
                name: 'login',
                path: '/login',
                component: resolve(__dirname, './src/pages/Login.vue'),
                meta: {
                    register: isRegister,
                    socialLogin: isSocialLogin
                }
            },
            {
                name: 'twofactor-verify',
                path: '/twofactor-verify',
                component: resolve(__dirname, './src/pages/TwofactorVerify.vue')
            },
            {
                name: 'logout',
                path: '/logout',
                component: resolve(__dirname, './src/pages/Logout.vue')
            },
            {
                name: 'forgot-password',
                path: '/forgot-password',
                component: resolve(__dirname, './src/pages/ForgotPassword.vue')
            },
            {
                name: 'forgot-password-token',
                path: '/forgot-password/:token',
                component: resolve(
                    __dirname,
                    './src/pages/ForgotPasswordNew.vue'
                )
            },
            {
                name: 'verify-email',
                path: '/verify-email/:userId',
                component: resolve(__dirname, './src/pages/VerifyEmail.vue')
            }
        ]

        if (isRegister) {
            baseArr.unshift({
                name: 'register',
                path: '/register',
                component: resolve(__dirname, './src/pages/Register.vue'),
                meta: {
                    socialLogin: isSocialLogin
                }
            })
        }

        if (isSocialLogin) {
            baseArr.push({
                name: 'login-service',
                path: '/login/:service/callback',
                component: resolve(__dirname, './src/pages/LoginOAuth.vue')
            })
        }

        mergeRoutes(routes, baseArr)
    })

    // Add nuxt plugin in the end
    const { dst } = this.addTemplate({
        src: resolve(__dirname, './src/assets/js/plugin.js'),
        fileName: join('awes-io', 'auth-plugin.js')
    })

    const authPlugin = { src: join(this.options.buildDir, dst) }

    const firstUserPluginIndex = this.options.plugins.findIndex(plugin => {
        const src = plugin.src || plugin
        return /^[.~]{0,2}(\/)plugins/.test(src)
    })

    if (firstUserPluginIndex === -1) {
        this.options.plugins.push(authPlugin)
    } else {
        this.options.plugins.splice(firstUserPluginIndex, 0, authPlugin)
    }

    this.nuxt.hook('awesIo:staticTranslations', async () => {
        for (const locale of this.options.awesIo.lang.locales) {
            const code = locale.code || locale

            try {
                const { default: translation } = await import(
                    '@awes-io/nuxt-auth/lang/' + code
                )

                for (const key in translation) {
                    this.options.awesIo.langStatic[code][key] = translation[key]
                }
            } catch (e) {
                console.warn(
                    'Awes.io/NuxtAuth: No default translation for ' +
                        code +
                        ' locale'
                )
            }
        }
    })
}

AwesIoNuxtAuth.meta = meta

export default AwesIoNuxtAuth
