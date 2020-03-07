const _ = require('lodash')
const chroma = require('chroma-js')

const DEFAULTS = {
    surface: '#fff'
}

const ON_DEFAULTS = {
    surface: '#222'
}

module.exports = function({ addComponents, addUtilities, e, theme, variants }) {
    const colors = theme('colors', DEFAULTS)
    const onColors = theme('onColors', ON_DEFAULTS)
    const colorNames = _.keys(colors)
    const colorSetsNames = _.keys(onColors)
    const borderDefault = theme('borderColor.default', 'currentColor')

    // dark theme
    const darkColors = theme('darkTheme.colors', {})
    const darkOnColors = theme('darkTheme.onColors', {})

    /*
     * Add CSS variables
     */
    const cssRoot = {}
    const darkThemeCssRoot = {}

    _.forEach(colors, (value, key) => {
        cssRoot[`--c-${key}`] = value
    })

    _.forEach(onColors, (value, key) => {
        cssRoot[`--c-on-${key}`] = value
    })

    _.forEach(onColors, (value, key) => {
        cssRoot[`--c-fade-${key}`] = chroma(value)
            .alpha(0.1)
            .css()
    })

    addComponents({ ':root': cssRoot })

    _.forEach(darkColors, (value, key) => {
        darkThemeCssRoot[`--c-${key}`] = value
    })

    _.forEach(darkOnColors, (value, key) => {
        darkThemeCssRoot[`--c-on-${key}`] = value
    })

    _.forEach(darkOnColors, (value, key) => {
        darkThemeCssRoot[`--c-fade-${key}`] = chroma(value)
            .alpha(0.1)
            .css()
    })

    addComponents({ ':root[data-dark]': darkThemeCssRoot })

    /*
     * Add color sets
     */
    const colorSets = _.fromPairs(
        _.flatten(
            _.map(colorSetsNames, name => {
                return [
                    [
                        `.${e(`bg-${name}`)}`,
                        {
                            background: `var(--c-${name})`,
                            color: `var(--c-on-${name})`
                        }
                    ]
                ]
            })
        )
    )

    addUtilities(colorSets, variants('backgroundColor'))

    /*
     * Add text colors
     */
    const text = _.fromPairs(
        _.flatten(
            _.map(colorNames, name => {
                return [
                    [
                        `.${e(`text-${name}`)}`,
                        {
                            color: `var(--c-${name})`
                        }
                    ],
                    [
                        `.${e(`text-on-${name}`)}`,
                        {
                            color: `var(--c-on-${name})`
                        }
                    ],
                    [
                        `.${e(`bg-on-${name}`)}`,
                        {
                            'background-color': `var(--c-on-${name})`
                        }
                    ]
                ]
            })
        )
    )

    addUtilities(text, variants('color'))

    addUtilities({ '.text-inherit': { color: 'inherit' } }, variants('color'))

    /*
     * Add border colors
     */
    const border = _.fromPairs(
        _.map(colorNames, name => {
            return [
                `.${e(`border-${name}`)}`,
                {
                    'border-color': `var(--c-${name}, ${borderDefault})`
                }
            ]
        })
    )

    addUtilities(border, variants('borderColor'))

    addUtilities(
        { '.border-text': { 'border-color': 'currentColor' } },
        variants('borderColor')
    )

    const background = _.fromPairs(
        _.map(colorNames, name => {
            return [
                `.${e(`bgcolor-${name}`)}`,
                {
                    background: `var(--c-${name})`
                }
            ]
        })
    )

    addUtilities(background, variants('backgroundColor'))

    addUtilities(
        { '.bgcolor-text': { 'background-color': 'currentColor' } },
        variants('backgroundColor')
    )
}
