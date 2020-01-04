const fs = require('fs')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-assets')({
            loadPaths: ['./src/assets/img']
        }),
        require('postcss-each'),
        require('postcss-simple-vars'),
        require('postcss-easings'),
        require('tailwindcss'),
        require('postcss-discard-empty'),
        require('autoprefixer'),
        require('postcss-custom-properties'),
        require('postcss-calc'),
        isDev ? false : require('cssnano')({ preset: 'default' })
        // isDev ? false : require("css-mqpacker")()
    ]
}
