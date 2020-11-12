const fs = require('fs')
const path = require('path')
const util = require('util')
const DOMParser = require('dom-parser')

const ICONS_FOLDER = path.resolve(__dirname, '../../assets/svg/image/')
const COMPILED_FILE_NAME = path.resolve(__dirname, '../../assets/js/icons.js')
const SVGRe = /\.svg$/

let icons = {}
const iconsFiles = fs.readdirSync(ICONS_FOLDER)

iconsFiles.forEach(filename => {
    if (!SVGRe.test(filename)) return

    let _filename = path.resolve(ICONS_FOLDER, filename)
    let content = fs.readFileSync(_filename, 'utf8')

    let doc = new DOMParser().parseFromString(content, 'image/svg+xml')
    let svg = doc.getElementsByTagName('svg')[0]

    // get dimensions
    let width =
            svg.getAttribute('width') ||
            svg.getAttribute('viewBox').split(' ')[2],
        height =
            svg.getAttribute('height') ||
            svg.getAttribute('viewBox').split(' ')[3],
        viewBox = svg.getAttribute('viewBox')

    const viewBoxArr = viewBox.split(' ')

    width = (width && parseInt(width)) || (viewBox && parseInt(viewBoxArr[2]))
    height =
        (height && parseInt(height)) || (viewBox && parseInt(viewBoxArr[3]))

    if (width && height) {
        let iconName = filename.replace(/\.svg$/, '')
        icons[iconName] = {
            width,
            height,
            viewBox: viewBox || `0 0 ${width} ${height}`,
            content: svg.innerHTML.replace(/>(\s+)</g, '><').trim()
        }
    }
})

fs.writeFileSync(
    COMPILED_FILE_NAME,
    '// prettier-ignore\nexport default' +
        util.inspect(icons, {
            compact: false,
            breakLength: Infinity,
            depth: Infinity
        }) +
        '\n',
    'utf-8'
)
