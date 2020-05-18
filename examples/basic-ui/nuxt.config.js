export default {
    mode: 'spa',
    head: {
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Ubuntu:400,500&display=swap'
            }
        ],
        meta: [
            { charset: 'utf-8' },
            {
                hid: 'viewport',
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, maximum-scale=1.0'
            }
        ]
    },

    modules: [
        // ...
        '@nuxtjs/axios',
        [
            '@awes-io/ui/nuxt',
            {
                // backgroundDarkFrameCenter: {
                //     src: 'https://cdn.easyweek.io/website/bg_login_black.svg',
                //     class: 'bg-cover bg-fixed bg-center'
                // }
            }
        ],
        // other @awes-io modules, which add custom routes should go before nuxt-i18n
        'nuxt-i18n'
    ],
    plugins: ['~/plugins/menu', '~/plugins/helper'],
    // add page default transition (if needed)
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    },

    // add nuxt-i18n basic config
    i18n: {
        vueI18n: {
            // `@awes-io/ui` will register lang strings under `en` locale
            fallbackLocale: 'en'
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    },
    awesIo: {
        ui: {
            components: {
                AwTableBuilder: {
                    // param: 'order'
                }
            }
            // deafaultLayout: 'LayoutSimple'
        }
    },

    serverMiddleware: ['~/api/index.js']
}
