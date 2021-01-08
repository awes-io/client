export default {
    ssr: false,

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

    components: [],

    modules: [
        // '@nuxtjs/axios',
        '@awes-io/ui/nuxt',
        '@awes-io/nuxt-auth',
        '@awes-io/nuxt-profile',
        '@awes-io/nuxt-admin'
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

    serverMiddleware: ['~/api'],

    // uncomment for external API
    //
    // axios: {
    //     proxy: true
    // },
    // proxy: {
    //     '/api/': {
    //         target: process.env.APP_SERVICE_API || '/'
    //     }
    // },

    awesIo: {
        nuxtAuth: {
            socialLogin: true
        }
    }
}
