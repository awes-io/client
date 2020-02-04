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

    modules: ['@awes-io/ui/nuxt', '@awes-io/dayjs', 'nuxt-i18n'],

    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English'
            },
            {
                code: 'ru',
                name: 'Русский'
            },
            {
                code: 'de',
                name: 'Deutsch'
            },
            {
                code: 'uk',
                name: 'Українська'
            }
        ],
        defaultLocale: 'en'
    },

    awesIo: {
        dayjs: {
            /**
             * Default format for string parsing
             *
             * @type {String|Object}
             *
             * @example
             * ```javascript
             * stringFormat: {
             *     pattern: 'HH:mm:ss', // parse/format pattern, null by default
             *     format: // use for format method, true by default
             * }
             * ```
             */
            stringFormat: 'YYYY-MM-DD[T]HH:mm:ssZZ',
            /**
             * Additional dayjs plugin
             *
             * @type {Array<String|Object>}
             *
             * @example
             * ```javasript
             * plugins: [
             *   'path/to/plugin',
             *   { src: 'path/to/plugin', options: {} }
             * ]
             * ```
             */
            plugins: ['dayjs/plugin/relativeTime']
        }
    }
}
