const chroma = require('chroma-js')

module.exports = {
    theme: {
        screens: {
            sm: '560px',
            md: '768px',
            lg: '1024px',
            xl: '1536px'
        },
        colors: {
            transparent: 'transparent',
            surface: '#fff',
            muted: '#f8f8f8',
            'muted-dark': '#e8e9eb',
            'muted-darker': '#d7dbde',
            disabled: '#949799',
            grey: '#595d62',
            overlay: '#222',
            brand: '#313e4d',
            success: '#5CB84B',
            link: '#1d6ec5',
            info: '#45A4DC',
            warning: '#EDC253',
            accent: '#f43e80',
            error: '#E9555B'
        },
        onColors: {
            surface: '#0f1012',
            muted: '#0f1012',
            'muted-dark': '#313336',
            'muted-darker': '#313336',
            light: '#0F1012',
            disabled: '#fff',
            overlay: '#fff',
            brand: '#fff',
            success: '#fff',
            info: '#fff',
            warning: '#0f1012',
            error: '#fff',
            link: '#fff'
        },
        darkTheme: {
            colors: {
                surface: '#383838',
                brand: '#2a2a2a',
                muted: '#2a2a2a',
                'muted-dark': '#252525',
                'muted-darker': '#333',
                link: '#2388f5',
                warning: '#ffd25e'
            },
            onColors: {
                surface: '#fff',
                brand: '#fff',
                muted: '#fff',
                'muted-dark': '#999',
                'muted-darker': '#a2a2a2'
            }
        },
        borderColor: theme => ({
            ...theme('colors'),
            default: 'var(--c-fade-muted, rgba(0,0,0,.1))'
        }),
        focusOutline: theme => `2px dashed ${theme('colors.info')}`,
        borderRadius: {
            none: '0',
            default: '.125rem',
            md: '.25rem',
            lg: '.375rem',
            full: '9999px'
        },
        container: {
            padding: {
                default: '1rem',
                lg: '2rem',
                xl: '3rem'
            }
        },
        opacity: {
            '0': 0,
            '10': 0.1,
            '20': 0.2,
            '40': 0.4,
            '50': 0.5,
            '60': 0.6,
            '80': 0.8,
            '90': 0.9,
            '100': 1
        },
        // See: https://github.com/benface/tailwindcss-typography
        textStyles: theme => ({
            heading: {
                output: false,
                fontFamily: theme('fontFamily.heading'),
                // fontWeight: theme('fontWeight.medium'),
                lineHeight: theme('lineHeight.tight'),
                marginTop: theme('spacing.8', '2rem'),
                marginBottom: theme('spacing.4', '1rem'),
                '&:first-child': {
                    marginTop: 0
                }
            },
            h1: {
                extends: 'heading',
                fontSize: theme('fontSize.4xl'),
                '@screen md': {
                    fontSize: theme('fontSize.5xl')
                }
            },
            h2: {
                extends: 'heading',
                fontSize: theme('fontSize.4xl')
            },
            h3: {
                extends: 'heading',
                fontSize: theme('fontSize.3xl')
            },
            h4: {
                extends: 'heading',
                fontSize: theme('fontSize.2xl')
            },
            h5: {
                extends: 'heading',
                fontSize: theme('fontSize.xl')
            },
            h6: {
                extends: 'heading',
                fontSize: theme('fontSize.lg')
            },
            link: {
                color: 'var(--c-link)',
                '&:hover, &:focus': {
                    outline: 'none',
                    textDecoration: 'underline'
                }
            },
            pre: {
                padding: theme('spacing.4'),
                borderRadius: theme('borderRadius.sm'),
                boxShadow: theme('boxShadow.inner'),
                overflowX: 'auto',
                backgroundColor: chroma(theme('colors.overlay', 'black'))
                    .alpha(0.1)
                    .css()
            },
            code: {
                padding: '.1em .2em',
                borderRadius: theme('borderRadius.sm'),
                color: theme('colors.error', 'tomato'),
                backgroundColor: chroma(theme('colors.error', 'tomato'))
                    .alpha(0.2)
                    .css()
            },
            content: {
                'p, ol, ul, blockquote': {
                    marginTop: theme('spacing.4'),
                    marginBottom: theme('spacing.4'),
                    '&:first-child': {
                        marginTop: 0
                    }
                },
                'ul:not([class])': {
                    listStyle: 'disc inside'
                },
                'ol:not([class])': {
                    listStyle: 'decimal inside'
                },
                'a:not([class])': {
                    extends: 'link'
                },
                'b, strong': {
                    fontWeight: theme('fontWeight.bold')
                },
                'i, em': {
                    fontStyle: 'italic'
                },
                '*:not(pre) > code': {
                    extends: 'code'
                },
                'pre:not([class])': {
                    extends: 'pre'
                },
                'blockquote:not([class])': {
                    padding: theme('spacing.4'),
                    borderLeft: '.25rem solid',
                    borderLeftColor: chroma(theme('colors.overlay', 'black'))
                        .alpha(0.1)
                        .css()
                },
                'blockquote:not([class]) > p:last-child': {
                    marginBottom: 0
                },
                h1: {
                    extends: 'h1'
                },
                h2: {
                    extends: 'h2'
                },
                h3: {
                    extends: 'h3'
                },
                h4: {
                    extends: 'h4'
                },
                h5: {
                    extends: 'h5'
                },
                h6: {
                    extends: 'h6'
                },
                'table:not([class])': {
                    width: '100%',
                    margin: '1rem 0'
                },
                'table:not([class]) td, table:not([class]) th': {
                    padding: '.25rem .5rem',
                    border: '1px solid var(--c-fade-surface)'
                },
                'table:not([class]) th': {
                    fontWeight: theme('fontWeight.bold')
                },
                hr: {
                    margin: `${theme('spacing.4')} 0`
                }
            }
        }),
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
                body: ['Open Sans', 'sans-serif']
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
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    plugins: [
        require('tailwindcss-accessibility'),
        require('tailwindcss-typography')({
            componentPrefix: ''
        }),
        require('./tailwind/base'),
        require('./tailwind/colors'),
        require('./tailwind/container'),
        require('./tailwind/chip'),
        require('./tailwind/outline-focus'),
        require('./tailwind/tab-nav')
    ]
}
