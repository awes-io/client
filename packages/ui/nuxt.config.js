import lang from './lang/en'

export default {
    head: {
        title: 'Awes.io UI',

        // htmlAttrs: {
        //     'data-dark': true
        // },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Ubuntu:400,500&display=swap'
            }
        ]
    },

    loading: { color: 'lightgreen' },

    css: ['./nuxt/icons.css'],

    plugins: ['~/plugins/ui-components.js'],

    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

    modules: ['@nuxtjs/axios', 'nuxt-i18n'],

    build: {
        transpile: ['body-scroll-lock'],
        postcss: {
            plugins: {
                'postcss-nested': {},
                'postcss-each': {},
                'postcss-simple-vars': {},
                'postcss-easings': {},
                tailwindcss: {},
                'postcss-color-function': {}
            }
        }
    },

    axios: {
        proxy: true
    },

    tailwindcss: {
        cssPath: './assets/css/main.css'
        // purgeCSSInDev: true
    },

    i18n: {
        vueI18n: {
            fallbackLocale: 'en',
            silentFallbackWarn: true,
            messages: {
                en: lang
            }
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    },

    server: {
        host: '0.0.0.0'
    },

    proxy: {
        '/api/': 'http://localhost:3030'
    }
}
