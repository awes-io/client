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

    modules: ['@awes-io/ui/nuxt', 'nuxt-i18n'],

    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    },

    i18n: {
        vueI18n: {
            fallbackLocale: 'en'
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    }
}
