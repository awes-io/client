import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-only'
import visualizer from 'rollup-plugin-visualizer'

const isProd = !(process.env.NODE_ENV !== 'production')

console.log('ROLLUP MODE: ' + (!isProd ? 'DEV' : 'PROD'))

const baseConfig = {
    input: './build/lib.js'
}

const external = [] // (if needed)

const headPlugins = [
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
            © Awescode GmbH :: <%= pkg.name %> \n
            Generated: <%= moment().format("YYYY-MM-DD HH:mm:ss") %> \n
            Version: <%= pkg.version %>
        `
    })
]

const vuePluginConfig = {
    css: false,
    template: {
        isProduction: isProd
    }
}

const configs = [
    // ESM
    {
        ...baseConfig,
        output: {
            file: 'dist/js/ui.esm.js',
            format: 'esm',
            exports: 'named',
            compact: isProd
        },
        plugins: [
            ...headPlugins,
            postcss({
                plugins: [
                    require('postcss-import'),
                    require('postcss-nested'),
                    require('postcss-each'),
                    require('postcss-simple-vars'),
                    require('postcss-easings'),
                    require('tailwindcss'),
                    require('postcss-color-function'),
                    require('postcss-discard-empty'),
                    require('autoprefixer'),
                    require('postcss-custom-properties'),
                    require('postcss-calc'),
                    isProd ? require('cssnano')({ preset: 'default' }) : false
                ],
                extract: './dist/css/ui.css'
            }),
            vue(vuePluginConfig),
            terser({
                compress: isProd,
                module: true,
                sourcemap: true,
                mangle: false,
                output: {
                    ecma: 6,
                    beautify: !isProd
                }
            }),
            ...tailPlugins
        ],
        watch: {
            exclude: /node_modules/
        }
    }
]

if (isProd) {
    configs.push(
        // UMD
        {
            ...baseConfig,
            external,
            output: {
                compact: isProd,
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
                                exclude: [
                                    '@babel/plugin-transform-regenerator'
                                ],
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

        // browser minified
        {
            ...baseConfig,
            external,
            output: {
                compact: isProd,
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
    )
}

export default configs
