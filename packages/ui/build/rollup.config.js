import vue from 'rollup-plugin-vue'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonJs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import alias from 'rollup-plugin-alias'
import path from 'path'
import replace from 'rollup-plugin-replace'
// import { eslint } from 'rollup-plugin-eslint'

export default {
    input: './src/index.js',
    output: {
        name: 'AwesUi',
        file: './dist/js/dev.js',
        format: 'iife',
        exports: 'named'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        alias({
            resolve: ['.js', '.vue'],
            entries: [
                {
                    find: /^~/,
                    replacement: path.resolve(__dirname, '../src')
                }
            ]
        }),
        vue(),
        postcss({ extract: './dist/css/ui.css' }),
        commonJs({
            include: /node_modules/
        }),
        nodeResolve({
            mainFields: ['module', 'main', 'jsnext:main'],
            browser: true
        }),
        json(),
        babel({
            // exclude: 'node_modules/**' // comment to test in ie11
            exclude: [/\/core-js\//] // no circular
        })
        // eslint()
    ],
    watch: {
        exclude: ['node_modules/**']
    }
}
