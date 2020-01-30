const R = require('rambdax')

function generateBEMClasses(block, styles) {
    const elementsStyles = R.filter(
        ({ output = true }) => output,
        R.omit('default', styles)
    )

    return {
        [`.${block}`]: R.path('default', styles),
        ...R.fromPairs(
            R.toPairs(elementsStyles).map(([element, style]) => {
                if (style.extends) {
                    style = R.mergeDeep(
                        R.pathOr({}, style.extends, styles),
                        style
                    )
                }

                return [
                    `.${block}__${element}`,
                    R.omit('extends,output', style)
                ]
            })
        )
    }
}

module.exports = {
    generateBEMClasses
}
