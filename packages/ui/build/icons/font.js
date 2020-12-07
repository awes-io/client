/**
 * Generates icon font
 */

const fs = require('fs')
const path = require('path')
const webfontsGenerator = require('webfonts-generator')

const ICONS_FOLDER = path.resolve(__dirname, '../../assets/svg/icon/')
const files = fs.readdirSync(ICONS_FOLDER).map(filename => {
    if (filename.indexOf('.svg') === -1) {
        return
    }
    return path.resolve(ICONS_FOLDER, filename)
})
const dest = path.resolve(__dirname, '../../dist/fonts')
const cssDest = path.resolve(__dirname, '../../dist/css/aw-icons.css')

const DEFAULTS = {
    files,
    dest,
    fontName: 'aw-icons',
    cssDest,
    cssTemplate: path.resolve(__dirname, './icon-tpl.hbs'),
    templateOptions: {
        classPrefix: 'aw-icon-',
        baseSelector: '.aw-icon'
    },
    cssFontsUrl: '/fonts/',
    types: ['woff2', 'woff'],
    fontHeight: 240
}

// build default file
webfontsGenerator(DEFAULTS, function(error) {
    if (error) {
        console.log('Fail!', error)
    } else {
        console.log('Default icons built!')
    }
})

// // build file for nuxt.js include
const FOR_NUXT = {
    ...DEFAULTS,
    cssFontsUrl: '../dist/fonts/', // raltive path for webpack assets loader
    cssDest: path.resolve(__dirname, '../../nuxt/icons.css')
}

webfontsGenerator(FOR_NUXT, function(error) {
    if (error) {
        console.log('Fail!', error)
    } else {
        console.log('Nuxt.js icons built!')
    }
})
