module.exports = {
    theme: {
        screens: {
            sm: '560px',
            md: '768px',
            lg: '1024px',
            xl: '1440px'
        },
        borderColor: (theme) => ({
            ...theme('colors'),
            default: 'rgba(var(--c-mono-50), 0.1)'
        }),
        focusOutline: (theme) => `2px dashed ${theme('colors.info')}`,
        borderRadius: {
            none: '0',
            default: '.125rem',
            md: '.25rem',
            lg: '.375rem',
            full: '9999px'
        },
        container: {
            maxWidth: '1250px',
            padding: {
                default: '1rem',
                lg: '2rem',
                xl: '2.5rem'
            }
        },
        opacity: {
            '0': '0',
            '10': '0.1',
            '20': '0.2',
            '30': '0.3',
            '40': '0.4',
            '50': '0.5',
            '60': '0.6',
            '70': '0.7',
            '80': '0.8',
            '90': '0.9',
            '100': '1'
        },
        calendar: {
            default: {
                borderTop: '2px solid var(--c-success)'
            },
            nav: {
                backgroundColor: 'var(--c-success)',
                color: 'var(--c-on-success)',
                marginTop: '-2px'
            },
            'day_active > span': {
                backgroundColor: 'var(--c-success)',
                color: 'var(--c-on-success)'
            }
        },
        extend: {
            width: {
                '1/7': `${(Math.floor(10000 / 7) / 100).toFixed(2)}%`
            },
            zIndex: {
                '1': 1,
                '100': 100,
                '110': 110
            },
            cursor: {
                help: 'help'
            },
            borderWidth: {
                '1': '1px'
            },
            minHeight: {
                xxs: '10rem',
                badge: '1.375rem'
            },
            minWidth: {
                '8': '2rem',
                badge: '1.375rem'
            },
            maxHeight: {
                '75vh': '75vh',
                unset: 'unset'
            },
            fontFamily: {
                heading: ['Ubuntu', 'sans-serif'],
                body: ['Roboto', 'sans-serif']
            },
            fontSize: {
                xxs: '0.5rem',
                '7xl': '5rem'
            },
            inset: {
                '1/2': '50%'
            },
            height: {
                '10vh': '10vh',
                '30vh': '30vh',
                '50vh': '50vh',
                '70vh': '70vh'
            },
            boxShadow: {
                default: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                outline: '0 0 0 2px var(--c-info)',
                'lg-top':
                    '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
                button: '2px 2px 4px rgba(0, 0, 0, 0.15)',
                'button-active': '1px 1px 2px rgba(0, 0, 0, 0.15)'
            }
        }
    },
    corePlugins: {
        textColor: false,
        borderColor: false,
        backgroundColor: false,
        container: false
    },
    variants: {
        // borderWidth: ['responsive', 'first', 'hover', 'focus'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover']
    },
    plugins: [require('./tailwind/colors'), require('./tailwind/container')]
}
