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
            disabled: '#999999',
            overlay: '#222',
            brand: '#37295e',
            success: '#7fc876',
            link: '#1d6ec5',
            info: '#45a4dc',
            warning: '#edc252',
            accent: '#F43E80',
            error: '#f36161'
        },
        onColors: {
            surface: '#0f1012',
            muted: '#0f1012',
            'muted-dark': '#313336',
            disabled: '#fff',
            overlay: '#fff',
            brand: '#fff',
            success: '#fff',
            info: '#fff',
            warning: '#fff',
            accent: '#fff',
            error: '#fff'
        },
        borderColor: theme => ({
            ...theme('colors'),
            default: 'rgba(0,0,0,.1)'
        }),
        borderRadius: {
            none: '0',
            default: '.125rem',
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
            minHeight: {
                xxs: '10rem'
            },
            minWidth: {
                '8': '2rem'
            },
            maxHeight: {
                '75vh': '75vh'
            },
            fontFamily: {
                heading: ['Ubuntu', 'sans-serif'],
                body: ['Open Sans', 'sans-serif']
            },
            fontSize: {
                xxs: '0.5rem',
                '7xl': '5rem'
            },
            height: {
                '10vh': '10vh',
                '30vh': '30vh',
                '50vh': '50vh',
                '70vh': '70vh'
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
    plugins: [
        require('tailwindcss-accessibility'),
        require('tailwindcss-typography')({
            componentPrefix: ''
        }),
        require('./tailwind/colors'),
        require('./tailwind/container'),
        require('./tailwind/calendar')
    ]
}
