export default {
    mode: 'universal',

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

    modules: [
        '@nuxtjs/axios',
        '@awes-io/dayjs',
        '@awes-io/ui/nuxt',
        '@awes-io/nuxt-localization',
        '@awes-io/nuxt-i18n'
    ],

    plugins: ['~/plugins/menu'],

    // overwrite auto-generated options
    i18n: {
        differnetDomains: false
    },

    awesIo: {
        nuxtI18n: {
            locales: [
                { code: 'en-GB' },
                // { code: 'en-US' }, // test duplicated locales in @awes-io/nuxt-localization
                { code: 'ru-RU' },
                { code: 'uk-UA' },
                { code: 'de-DE' }
            ]
        },
        nuxtLocalization: {
            export:
                'http://e2e-my.easyweek.io/api/localization/translations/download'
        }
    },

    serverMiddleware: ['~/serverMiddleware/index.js']
}
