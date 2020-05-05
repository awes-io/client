export default {
    mode: 'spa',

    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    i18n: {
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                iso: 'en-US'
            }
        ]
    },

    modules: [
        '@nuxtjs/axios',
        '@awes-io/ui/nuxt',
        '@awes-io/nuxt-auth',
        'nuxt-i18n'
    ],

    plugins: ['~/plugins/menu'],

    serverMiddleware: ['~/serverMiddleware/api']
}
