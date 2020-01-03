const isModern = process.env.BROWSERS_ENV === 'modern'

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: '2',
                targets: isModern ? { esmodules: true } : 'ie 11'
                // debug: true
            }
        ]
    ]
}
