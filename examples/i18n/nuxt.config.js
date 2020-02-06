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

    modules: ['@awes-io/ui/nuxt', '@awes-io/dayjs', '@awes-io/nuxt-i18n'],

    // overwrite auto-generated options
    i18n: {
        differnetDomains: false
    },

    awesIo: {
        nuxtI18n: {
            locales: [
                { code: 'en', domain: 'local-widget.easyweek.io:3000' },
                { code: 'ru', domain: 'local-widget.easyweek.ru:3000' },
                { code: 'uk', domain: 'local-widget.easyweek.com.ua:3000' },
                { code: 'de', domain: 'local-widget.easyweek.de:3000' }
            ]
        }
    },

    serverMiddleware: ['~/serverMiddleware/index.js']
}
