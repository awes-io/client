export default {
    ssr: false,

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

    components: [],

    css: ['@fortawesome/fontawesome-free/css/all.css'],

    // add awes-io/ui module
    modules: ['@awes-io/ui/nuxt'],

    plugins: ['~/plugins/menu', '~/plugins/helper'],

    // add page default transition (if needed)
    // pageTransition: {
    //     name: 'fade',
    //     mode: 'out-in'
    // },

    // add nuxt-i18n basic config
    i18n: {
        vueI18n: {
            // `@awes-io/ui` will register lang strings under `en` locale
            fallbackLocale: 'en'
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    },

    // awesIo: {
    //     ui: {
    //         components: {
    //             AwTableBuilder: {
    //                 // param: 'order'
    //             },
    //             AwMenu: {
    //                 // iconColor: 'yellow'
    //             }
    //         }
    //         // deafaultLayout: 'LayoutSimple'
    //     }
    // },

    serverMiddleware: ['~/api/index.js']
}
