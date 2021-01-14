const _ = require('lodash')
const chroma = require('chroma-js')

const DEFAULTS = {
    surface: '#fff'
}

const ON_DEFAULTS = {
    surface: '#222'
}

const getRootVars = (cssRoot) => (value, key) => {
    const [r, g, b] = chroma(value).rgb()

    cssRoot[`--c-${key}`] = chroma([r, g, b]).hex()
    cssRoot[`--c-${key}-rgb`] = [r, g, b].join(',')
}

const getColorVariables = (opacityVar, name, value) => {
    const defaultOpacity = value ? chroma(value).get('rgba.a') : 1
    return `rgba(var(--c-${name}-rgb), var(${opacityVar}, ${defaultOpacity}))`
}

module.exports = function({ addComponents, addUtilities, e, theme, variants }) {
    const colors = theme('colors', DEFAULTS)
    const onColors = theme('onColors', ON_DEFAULTS)

    // dark theme
    const darkColors = theme('darkTheme.colors', {})
    const darkOnColors = theme('darkTheme.onColors', {})

    /*
     * Add CSS variables
     */
    const cssRoot = {}

    const darkThemeCssRoot = {}

    _.forEach(colors, getRootVars(cssRoot))

    _.forEach(onColors, (value, key) =>
        getRootVars(cssRoot)(value, 'on-' + key)
    )

    addComponents({ ':root': cssRoot })

    _.forEach(darkColors, getRootVars(darkThemeCssRoot))

    _.forEach(darkOnColors, (value, key) =>
        getRootVars(darkThemeCssRoot)(value, 'on-' + key)
    )

    addComponents({ ':root[data-dark="true"]': darkThemeCssRoot })

    /*
     * Add background colors
     */
    const background = _.fromPairs(
        _.map(colors, (value, name) => [
            `.${e(`bg-${name}`)}`,
            {
                'background-color': getColorVariables(
                    '--bg-opacity',
                    name,
                    value
                ),
                color: getColorVariables(
                    '--text-opacity',
                    'on-' + name,
                    onColors[name]
                )
            }
        ])
    )

    addUtilities(background, variants('backgroundColor'))

    addUtilities(
        {
            '.bg-current': { 'background-color': 'currentColor' },
            '.bg-transparent': {
                'background-color': 'rgba(var(--c-surface-rgb), 0)'
            }
        },
        variants('backgroundColor')
    )

    /*
     * Add text colors
     */
    const text = _.fromPairs(
        _.map(colors, (value, name) => {
            return [
                `.${e(`text-${name}`)}`,
                {
                    color: getColorVariables('--text-opacity', name, value)
                }
            ]
        })
    )

    addUtilities(text, variants('textColor'))

    const onText = _.fromPairs(
        _.map(onColors, (value, name) => {
            return [
                `.${e(`text-on-${name}`)}`,
                {
                    color: getColorVariables(
                        '--text-opacity',
                        'on-' + name,
                        value
                    )
                }
            ]
        })
    )

    addUtilities(onText, variants('textColor'))

    addUtilities(
        {
            '.text-inherit': { color: 'inherit' },
            '.text-transparent': {
                color: ['transparent', 'rgba(var(--c-on-surface-rgb), 0)']
            }
        },
        variants('textColor')
    )

    /*
     * Add border colors
     */
    const border = _.fromPairs(
        _.map(colors, (value, name) => {
            return [
                `.${e(`border-${name}`)}`,
                {
                    'border-color': getColorVariables(
                        '--border-opacity',
                        name,
                        value
                    )
                }
            ]
        })
    )

    addUtilities(border, variants('borderColor'))

    addUtilities(
        {
            '.border-current': { 'border-color': 'currentColor' },
            '.border-transparent': {
                'border-color': ['transparent', 'rgba(var(--c-surface-rgb), 0)']
            }
        },
        variants('borderColor')
    )
}
