import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-only'
import alias from 'rollup-plugin-alias'
import path from 'path'
import visualizer from 'rollup-plugin-visualizer'

const baseConfig = {
    input: './src/entry.js'
}

const external = [] // (if needed)

const headPlugins = [
    alias({
        resolve: ['.js', '.vue'],
        entries: [
            {
                find: /^~/,
                replacement: path.resolve(__dirname, '../src')
            }
        ]
    }),
    commonJs({
        include: /node_modules/
    }),
    nodeResolve({
        mainFields: ['module', 'main', 'jsnext:main'],
        browser: true
    })
]

const tailPlugins = [
    license({
        banner: `
            Bundle of AWES <%= pkg.name %> \n
            Generated: <%= moment().format("YYYY-MM-DD HH:mm:ss") %> \n
            Version: <%= pkg.version %>
        `
    })
]

const vuePluginConfig = {
    css: false,
    template: {
        isProduction: true
    }
}

export default [
    // ESM
    {
        ...baseConfig,
        output: {
            file: 'dist/js/ui.esm.js',
            format: 'esm',
            exports: 'named'
        },
        plugins: [
            ...headPlugins,
            postcss({ extract: './dist/css/ui.css' }),
            vue(vuePluginConfig),
            terser({
                output: {
                    ecma: 6
                }
            }),
            ...tailPlugins
        ]
    },

    // UMD
    {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/js/ui.ssr.js',
            format: 'cjs',
            name: 'AwesUi',
            exports: 'named'
        },
        plugins: [
            ...headPlugins,
            vue({
                ...vuePluginConfig,
                css: false,
                template: {
                    ...vuePluginConfig.template,
                    optimizeSSR: true
                }
            }),
            css({ output: false }),
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: { node: true },
                            exclude: ['@babel/plugin-transform-regenerator'],
                            useBuiltIns: false
                        }
                    ]
                ],
                exclude: [/\/core-js\//]
            }),
            visualizer(),
            ...tailPlugins
        ]
    },

    // IIFE
    {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/js/ui.min.js',
            format: 'iife',
            name: 'AwesUi',
            exports: 'named'
        },
        plugins: [
            ...headPlugins,
            vue(vuePluginConfig),
            css({ output: false }),
            babel({
                exclude: [/\/core-js\//]
            }),
            terser({
                output: {
                    ecma: 5
                }
            }),
            ...tailPlugins
        ]
    }
]
