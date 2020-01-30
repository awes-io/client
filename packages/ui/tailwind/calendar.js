const R = require('rambdax')
const { generateBEMClasses } = require('./_helpers')

function getBaseStyle(theme) {
    return {
        // wrapping element
        default: {
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: theme('colors.surface'),
            paddingBottom: theme('spacing.2')
        },

        // elements
        nav: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme('spacing.1'),
            paddingRight: theme('spacing.1'),
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
            width: '100%'
        },
        'nav-title': {
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        cell: {
            // disable separate class creation, used for extend purpose only
            output: false,
            width: `${100 / 7.001}%`,
            paddingLeft: theme('spacing.1'),
            paddingRight: theme('spacing.1'),
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
            fontSize: theme('fontSize.sm')
        },
        weekday: {
            // extend from other element
            extends: 'cell',
            display: 'block',
            textAlign: 'center',
            opacity: 0.8,
            marginTop: theme('spacing.2')
        },
        day: {
            // extend from other element
            extends: 'cell',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        day_outside: {
            opacity: 0.4,
            pointerEvents: 'none',
            cursor: 'default'
        },
        day_disabled: {
            extends: 'day_outside'
        },
        'day > span': {
            display: 'block',
            width: theme('spacing.8'),
            height: theme('spacing.8'),
            textAlign: 'center',
            lineHeight: 1.1428,
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
            borderRadius: '50%'
        },
        'day_active > span': {
            fontWeight: 'bold'
        }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('calendar', {}))

    addComponents(generateBEMClasses('calendar', STYLE))
}
