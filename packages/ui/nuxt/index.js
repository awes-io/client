import { resolve, join } from 'path'
// import { readdirSync } from 'fs'
import _ from 'lodash'

const meta = require('./../package.json')

// const DARK_THEME_FILES = readdirSync(resolve(__dirname, './dark-theme/'))

export const DEFAULTS = {
    logo: {
        src: 'https://static.awes.io/logo-blue.svg',
        alt: 'Awes.io',
        style: {
            width: '70px'
        }
    },
    backgroundFrameCenter: {
        src: 'https://static.awes.io/demo/awes-background.svg',
        class: 'bg-cover bg-fixed bg-center'
    },
    components: {},
    permissions: {
        storePath: 'auth.user.permissions'
    },
    addCss: true,
    offline: {
        testUrl: 'https://httpbin.org/get',
        interval: 5000,
        maxTries: Infinity
    },
    deafaultLayout: 'LayoutDefault'
}

function AwesIoUi(_options) {
    // check store existance
    if (!this.options.store) {
        throw new Error('Awes.io/UI: Vuex store is required')
    }

    // add es6 transpiling
    this.options.build.transpile.push('@awes-io/ui')

    const options = _.merge(
        {},
        DEFAULTS,
        _.get(this.options, 'awesIo.ui', {}),
        _options
    )

    // add plugin (dark theme switcher)
    // NOTE! add before store, beacuse plugins adds with 'unshift'
    this.addPlugin({
        fileName: join('awes-io', 'dark-theme-plugin.js'),
        src: resolve(join(__dirname, './dark-theme-plugin.js'))
    })

    // add plugin (register components and store)
    this.addPlugin({
        fileName: join('awes-io', 'ui-plugin.js'),
        src: resolve(__dirname, './plugin.js'),
        options
    })

    // add styles
    if (options.addCss) {
        this.options.css.push(
            resolve(__dirname, '../dist/css/ui.css'),
            resolve(__dirname, './icons.css')
        )
    }

    // register layouts
    this.addTemplate({
        fileName: join('awes-io', 'layout-mixin.js'),
        src: resolve(join(__dirname, './layout-mixin.js'))
    })

    const LAYOUTS = ['LayoutDefault', 'LayoutSimple']
    LAYOUTS.forEach(layout => {
        this.addLayout(
            {
                fileName: join('awes-io', `${layout}.vue`),
                src: resolve(__dirname, `./layouts/${layout}.vue`)
            },
            options.deafaultLayout === layout ? 'default' : layout
        )
    })

    this.addLayout({
        fileName: join('awes-io', 'LayoutFrameScreen.vue'),
        src: resolve(__dirname, './layouts/LayoutFrameScreen.vue')
    })

    this.addLayout({
        fileName: join('awes-io', 'LayoutFrameCenter.vue'),
        src: resolve(__dirname, './layouts/LayoutFrameCenter.vue'),
        options: _.pick(options, [
            'backgroundDarkFrameCenter',
            'backgroundFrameCenter',
            'logo'
        ])
    })

    this.addLayout(
        {
            fileName: join('awes-io', 'LayoutError.vue'),
            src: resolve(__dirname, './layouts/LayoutError.vue')
        },
        'error'
    )

    this.addLayout(
        {
            fileName: join('awes-io', 'LayoutEmpty.vue'),
            src: resolve(__dirname, './layouts/LayoutEmpty.vue')
        },
        'empty'
    )

    // add axios offline interceptor
    const offlinePlugin = this.addTemplate({
        fileName: join('awes-io', 'ui-offline-plugin.js'),
        src: resolve(__dirname, './offline-plugin.js'),
        options: options.offline
    })
    this.options.plugins.push(join(this.options.buildDir, offlinePlugin.dst))

    // fix error path
    this.options.ErrorPage = resolve(
        this.options.rootDir,
        this.options.buildDir,
        'awes-io',
        'LayoutError.vue'
    )

    // add localization
    _.set(this.options.i18n, 'vuex.syncLocale', true)

    const langPlugin = this.addTemplate({
        fileName: join('awes-io', 'ui-i18n-plugin.js'),
        src: resolve(__dirname, './i18n-plugin.js'),
        options: { moduleName: meta.name }
    })
    this.options.plugins.push(join(this.options.buildDir, langPlugin.dst))
}

AwesIoUi.meta = meta

export default AwesIoUi
