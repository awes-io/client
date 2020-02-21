const R = require('rambdax')
const { generateBEMClasses } = require('./_helpers')

function getBaseStyle() {
    return {
        // wrapping element
        default: {
            // display: 'flex',
            maxWidth: '100%',
            position: 'relative',
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
            'scroll-snap-stop': 'always'
        }
        // overflow: {
        //     output: false,
        //     content: '""',
        //     width: '1rem',
        //     height: '100%',
        //     top: 0,
        //     position: 'absolute'
        // },
        // 'default_overflow-left:before': {
        //     extends: 'overflow',
        //     left: 0,
        //     backgroundImage: 'linear-gradient(90deg, black, rgba(0,0,0,0))'
        // },
        // 'default_overflow-right:after': {
        //     extends: 'overflow',
        //     right: 0,
        //     backgroundImage: 'linear-gradient(-90deg, black, rgba(0,0,0,0))'
        // }
    }
}

module.exports = function({ addComponents, theme }) {
    const STYLE = R.mergeDeep(getBaseStyle(theme), theme('slider', {}))

    addComponents(generateBEMClasses('aw-slider', STYLE))
}
