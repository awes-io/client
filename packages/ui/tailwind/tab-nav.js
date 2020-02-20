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
            transition: 'color 300ms, border-color 300ms',
            marginLeft: theme('spacing.3'),
            marginRight: theme('spacing.3'),
            paddingLeft: theme('spacing.1'),
            paddingRight: theme('spacing.1'),
            paddingTop: theme('spacing.4'),
            paddingBottom: theme('spacing.4'),
            fontSize: theme('fontSize.sm'),
            color: theme('colors.disabled'),
            lineHeight: 1,
            borderBottom: '2px solid transparent',
            whiteSpace: 'nowrap'
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
            width: 0,
            borderColor: 'transparent'
        },
        'toggler:hover': {
            color: theme('onColors.surface')
        },
        'toggler:focus': {
            color: theme('onColors.surface'),
            outline: 'none'
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
