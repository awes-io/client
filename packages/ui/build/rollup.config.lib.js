import config from './rollup.config.js'

export default {
    ...config,
    input: './src/entry.js',
    output: {
        name: 'AwesUi',
        file: './dist/js/dev.js',
        format: 'esm',
        exports: 'named'
    }
}
