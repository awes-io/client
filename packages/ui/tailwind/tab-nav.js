const R = require('rambdax')
const { generateBEMClasses } = require('./_helpers')

function getBaseStyle(theme) {
    return {
        // wrapping element
        default: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid var(--c-muted-dark)`
        },

        // elements
        toggler: {
            display: 'flex',
            alignItems: 'center',
            margin: `0 ${theme('spacing.3')}`,
            fontSize: theme('fontSize.sm'),
            color: 'var(--c-disabled)',
            whiteSpace: 'nowrap'
        },
        'toggler > div': {
            height: '100%',
            padding: `${theme('spacing.2')} 0`,
            borderBottom: '2px solid transparent',
            transition: 'color 300ms, border-color 300ms',
            position: 'relative'
        },
        'toggler > div > span': {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: `${theme('spacing.3')} ${theme('spacing.1')}`
        },
        'toggler > div:before': {
            content: '""',
            left: `-${theme('spacing.3')}`,
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1px',
            height: theme('spacing.6'),
            display: 'block',
            borderLeft: '1px solid var(--c-muted-dark)'
        },
        'toggler:first-child > div:before': {
            content: 'none'
        },
        'toggler:hover': {
            color: 'var(--c-on-surface)'
        },
        'toggler:focus': {
            outline: 'none'
        },
        'toggler > div > span:focus': {
            outline: 'none'
        },
        'toggler > div:focus': {
            outline: 'none'
        },
        'toggler:focus > div > span': {
            color: 'var(--c-on-surface)',
            outline: theme('focusOutline', 'none')
        },
        'toggler_active > div': {
            color: 'var(--c-on-surface)',
            borderColor: 'var(--c-brand)'
        }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('tab-nav', {}))

    addComponents(generateBEMClasses('aw-tab-nav', STYLE))
}
