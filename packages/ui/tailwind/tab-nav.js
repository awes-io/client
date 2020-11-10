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
            padding: `theme('spacing.2') ${theme('spacing.3')}`,
            fontSize: theme('fontSize.sm'),
            color: 'var(--c-disabled)',
            whiteSpace: 'nowrap'
        },
        'toggler > span': {
            height: '100%',
            padding: `${theme('spacing.3')} ${theme('spacing.1')}`,
            transition: 'color 300ms',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
        'toggler > span:before': {
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
        'toggler > span:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: `-${theme('spacing.2')}`,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'transparent',
            transition: 'background-color 300ms'
        },
        'toggler:first-child > span:before': {
            content: 'none'
        },
        'toggler:hover': {
            color: 'var(--c-on-surface)'
        },
        'toggler:focus': {
            outline: 'none'
        },
        'toggler > span:focus': {
            outline: 'none'
        },
        'toggler:focus > span': {
            color: 'var(--c-on-surface)',
            outline: theme('focusOutline', 'none')
        },
        'toggler_active > span': {
            color: 'var(--c-on-surface)'
        },
        'toggler_active > span:after': {
            color: 'var(--c-on-surface)',
            backgroundColor: 'var(--c-brand)'
        }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('tab-nav', {}))

    addComponents(generateBEMClasses('aw-tab-nav', STYLE))
}
