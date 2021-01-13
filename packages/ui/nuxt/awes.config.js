import styles from '../assets/js/styles'

export default {
    logo: {
        src: 'https://static.awes.io/logo-blue_white.svg',
        alt: 'Awes.io'
    },

    background: {
        src: 'https://static.awes.io/demo/awes-background.svg'
    },

    googleFont:
        'https://fonts.googleapis.com/css?family=Roboto:400,700|Ubuntu:400,500&display=swap',

    style: styles.default
}

export const dark = {
    logo: {
        src: 'https://static.awes.io/logo-blue.svg',
        alt: 'Awes.io'
    },

    background: {
        src: 'https://static.awes.io/demo/awes-background.svg'
    },

    style: styles.dark
}

export const lang = {
    locales: ['en'],
    locale: 'en',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    // own props
    fetchTranslation: false,
    langCookie: 'i18n_redirected'
}

export const dayjs = {
    stringFormat: {
        pattern: null,
        format: true
    },
    plugins: ['dayjs/plugin/customParseFormat', 'dayjs/plugin/localizedFormat']
}
