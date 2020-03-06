const R = require('rambdax')
const { generateBEMClasses } = require('./_helpers')

function getBaseStyle(theme) {
    return {
        // wrapping element
        default: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${theme('colors.muted-darker')}`
        },

        // elements
        toggler: {
            display: 'flex',
            alignItems: 'center',
            padding: `${theme('spacing.2')} 0`,
            transition: 'color 300ms, border-color 300ms',
            margin: `0 ${theme('spacing.3')}`,
            fontSize: theme('fontSize.sm'),
            color: theme('colors.disabled'),
            lineHeight: 1,
            borderBottom: '2px solid transparent',
            whiteSpace: 'nowrap'
        },
        'toggler > span': {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: `${theme('spacing.3')} ${theme('spacing.1')}`
        },
        'toggler:before': {
            content: '""',
            marginLeft: `-${theme('spacing.4')}`,
            marginRight: theme('spacing.4'),
            width: '1px',
            height: theme('spacing.6'),
            display: 'block',
            borderLeft: `1px solid ${theme('colors.muted-darker')}`
        },
        'toggler:first-child:before': {
            content: 'none'
        },
        'toggler:hover': {
            color: theme('onColors.surface')
        },
        'toggler:focus': {
            outline: 'none'
        },
        'toggler > span:focus': {
            outline: 'none'
        },
        'toggler:focus > span': {
            color: theme('onColors.surface'),
            outline: theme('focusOutline', 'none')
        },
        toggler_active: {
            color: theme('onColors.surface'),
            borderColor: theme('colors.brand')
        }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('tab-nav', {}))

    addComponents(generateBEMClasses('aw-tab-nav', STYLE))
}
