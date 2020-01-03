const _ = require('lodash')

module.exports = function({ addComponents, theme }) {
    const screens = theme('screens')
    const containerPadding = theme('container.padding', {})
    const containerCenter = theme('container.center', true)
    const maxScreen = _.maxBy(_.toPairs(screens), screen => parseInt(screen[1]))
    let _padding = theme('container.padding.default')

    const container = [
        {
            '.container': _.merge(
                { width: '100%', maxWidth: maxScreen[1] },
                containerCenter
                    ? { marginLeft: 'auto', marginRight: 'auto' }
                    : {},
                _padding
                    ? { paddingLeft: _padding, paddingRight: _padding }
                    : {}
            )
        }
    ]

    _.forEach(_.omit(screens, [maxScreen[0]]), (value, key) => {
        const style = {}

        style[`.container-${key}`] = {
            maxWidth: value
        }

        container.push(style)
    })

    _.forEach(containerPadding, (value, key) => {
        if (key === 'default') return

        container.push({
            [`@media (min-width: ${screens[key]})`]: {
                '.container': { paddingLeft: value, paddingRight: value }
            }
        })
    })

    addComponents(container)
}
