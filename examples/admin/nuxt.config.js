export default {
    mode: 'universal',

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
        '@awes-io/nuxt-admin',
        '@awes-io/nuxt-i18n'
    ],

    awesIo: {
        nuxtI18n: {
            locales: ['en-US']
        }
    },

    axios: {
        proxy: true
    },

    proxy: {
        '/api/': 'http://e2e-my.easyweek.io/'
    }
}
