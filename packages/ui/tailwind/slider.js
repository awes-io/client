const R = require('rambdax')
const { generateBEMClasses } = require('./_helpers')

function getBaseStyle() {
    return {
        // wrapping element
        default: {
            display: 'flex',
            width: '100%',
            'overflow-x': 'scroll',
            // 'overflow-x': 'overlay',
            'scroll-snap-type': 'x proximity',
            'scroll-behavior': 'smooth',
            '-ms-overflow-style': 'none',
            // '-webkit-overflow-scrolling': 'touch',
            'scrollbar-width': 'none'
        },
        'default::-webkit-scrollbar': {
            display: 'none',
            backgroundColor: 'transparent',
            height: '0px',
            width: '0px'
        },
        'default::-webkit-scrollbar-thumb': {
            display: 'none',
            backgroundColor: 'transparent'
        },
        'default > *': {
            'scroll-snap-align': 'start end',
            'scroll-snap-stop': 'always',
            'user-select': 'none',
            'user-drag': 'none'
        }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('slider', {}))

    addComponents(generateBEMClasses('aw-slider', STYLE))
}
