export default {
    logo: {
        src: 'https://static.awes.io/logo-blue.svg',
        alt: 'Awes.io'
    },

    background: {
        src: 'https://static.awes.io/demo/awes-background.svg'
    },

    googleFont:
        'https://fonts.googleapis.com/css?family=Roboto:400,700|Ubuntu:400,500&display=swap',

    style: {
        colors: {
            brand: '#202873',
            success: '#58c344',
            info: '#45a4dc',
            warning: '#edc253',
            error: '#e9555b',

            surface: '#fff',
            overlay: 'rgba(0, 0, 0, 0.5)',
            link: '#1d6ec5',

            'mono-0': '#000',
            'mono-50': '#0f1012',
            'mono-100': '#313336',
            'mono-200': '#464a4e',
            'mono-300': '#595d62',
            'mono-400': '#949792',
            'mono-500': '#aaaeb0',
            'mono-600': '#c1c4c7',
            'mono-700': '#d7dbde',
            'mono-800': '#e8e9eb',
            'mono-900': '#f8f8f8',
            'mono-1000': '#fff'
        },

        onColors: {
            brand: '#fff',
            success: '#fff',
            info: '#fff',
            warning: '#333',
            error: '#fff',

            surface: '#0f1012',
            overlay: '#fff',
            link: '#fff',

            'mono-0': '#fff',
            'mono-50': '#fff',
            'mono-100': '#fff',
            'mono-200': '#fff',
            'mono-300': '#fff',
            'mono-400': '#fff',
            'mono-500': '#fff',
            'mono-600': '#333',
            'mono-700': '#333',
            'mono-800': '#333',
            'mono-900': '#333',
            'mono-1000': '#333'
        }
    }
}

export const dark = {
    logo: {
        src: 'https://static.awes.io/logo-blue.svg',
        alt: 'Awes.io'
    },

    background: {
        src: 'https://static.awes.io/demo/awes-background.svg'
    },

    style: {
        colors: {
            surface: '#383838',
            brand: '#2a2a2a',
            link: '#2388f5',
            warning: '#ffd25e'
        },

        onColors: {
            surface: '#fff',
            brand: '#fff'
        }
    }
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
