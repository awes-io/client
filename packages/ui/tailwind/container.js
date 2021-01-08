const _ = require('lodash')

module.exports = function({ addComponents, theme }) {
    const screens = theme('screens')
    const containerPadding = theme('container.padding', {})
    const containerCenter = theme('container.center', true)
    const maxWidth = theme('container.maxWidth', '1200px')
    let _padding = theme('container.padding.default')

    const container = [
        {
            '.container, .container-fluid': _.merge(
                { maxWidth: '100%' },
                containerCenter
                    ? { marginLeft: 'auto', marginRight: 'auto' }
                    : {},
                _padding
                    ? { paddingLeft: _padding, paddingRight: _padding }
                    : {}
            ),
            '.container': { width: maxWidth }
        }
    ]

    _.forEach(containerPadding, (value, key) => {
        if (key === 'default') return

        container.push({
            [`@media (min-width: ${screens[key]})`]: {
                '.container, .container-fluid': {
                    paddingLeft: value,
                    paddingRight: value
                }
            }
        })
    })

    addComponents(container)
}
