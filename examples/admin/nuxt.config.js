export default {
    mode: 'spa',

    head: {
        title: 'Admin module example',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    modules: [
        '@nuxtjs/axios',
        '@awes-io/ui/nuxt',
        '@awes-io/nuxt-auth',
        '@awes-io/nuxt-profile',
        '@awes-io/nuxt-admin',
        '@awes-io/nuxt-i18n'
    ],
    i18n: {
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                iso: 'en-US'
            },
            {
                code: 'ru',
                iso: 'ru-RU'
            }
        ]
    },
    axios: {
        proxy: true
    },

    awesIo: {
        nuxtAuth: {
            register: `{{ $t('ui.login.no_account') }}
                <AwLink :href="localePath({ path: '/register' })">
                    {{ $t('ui.login.create_account') }}
                </AwLink>`
        }
    },

    proxy: {
        '/api/': {
            target: process.env.APP_SERVICE_API || '/'
        }
    }
}
