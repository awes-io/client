import { mergeDeepRight, pick, omit, uniq, endsWith, partition } from 'rambdax'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import resolveConfig from 'tailwindcss/resolveConfig'
import {
    default as configDefault,
    dark,
    lang as configLang,
    dayjs as configDayjs
} from './awes.config.js'
import defaultTailwindConfig from '../tailwind.config.js'

const configDark = mergeDeepRight(configDefault, dark)

export const MODULE_DIR = 'awes-io'

async function AwesIoUi() {
    /**
     * Check store existance
     */
    if (!this.options.store) {
        throw new Error('Awes.io/UI: Vuex store is required')
    }

    /**
     * Check components enabled
     */
    if (!this.options.components) {
        throw new Error('Awes.io/UI: Components should be enabled')
    }

    /**
     * Check NODE_ENV exists (required for postCSS)
     */
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = this.nuxt.options.dev
            ? 'development'
            : 'production'
    }

    /**
     * Check VERSION exists
     */
    this.nuxt.options.publicRuntimeConfig.VERSION =
        this.nuxt.options.publicRuntimeConfig.VERSION ||
        process.env.APP_VERSION ||
        process.env.npm_package_version

    /**
     * Add transpiling
     */
    this.options.build.transpile.push(
        '@awes-io/ui/store/awes.js',
        '@awes-io/ui/directives/tooltip'
    )

    /**
     * Merge config
     */
    const projectConfigPath = join(this.options.srcDir, './awes.config.js')

    if (existsSync(projectConfigPath)) {
        const {
            default: _defaultConfig,
            dark: _darkConfig,
            lang: _langConfig,
            dayjs: _dayjsConfig
        } = require(projectConfigPath)

        this.options.awesIo = {
            default: mergeDeepRight(configDefault, _defaultConfig || {}),
            dark: mergeDeepRight(configDark, _darkConfig || {}),
            lang: mergeDeepRight(configLang, _langConfig || {}),
            dayjs: mergeDeepRight(configDayjs, _dayjsConfig || {})
        }

        if (this.nuxt.options.dev) {
            this.nuxt.options.watch.push(projectConfigPath)
        }
    } else {
        this.options.awesIo = {
            default: configDefault,
            dark: configDark,
            lang: configLang,
            dayjs: configDayjs
        }
    }

    /**
     * Add font
     */
    if (this.options.awesIo.default.googleFont) {
        const head = this.options.head

        head.link = head.link || []

        head.link = uniq(
            head.link.concat(
                {
                    rel: 'stylesheet',
                    href: this.options.awesIo.default.googleFont
                },
                {
                    rel: 'dns-prefetch',
                    href: '//fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: '//fonts.googleapis.com'
                },
                {
                    rel: 'dns-prefetch',
                    href: '//fonts.gstatic.com'
                },
                {
                    rel: 'preconnect',
                    href: '//fonts.gstatic.com'
                }
            )
        )
    }

    /**
     * Add tailwind
     */
    this.nuxt.hook('build:before', async () => {
        const { postcss } = this.nuxt.options.build
        const { dev, rootDir, srcDir } = this.nuxt.options

        const tailwindConfig = {
            ...defaultTailwindConfig,
            theme: {
                ...defaultTailwindConfig.theme,
                ...pick('colors,onColors', this.options.awesIo.default.style),
                darkTheme: pick(
                    'colors,onColors',
                    this.options.awesIo.dark.style
                )
            },
            extend: {
                ...defaultTailwindConfig.extend,
                ...omit('colors,onColors', this.options.awesIo.default.style)
            },
            purge: {
                enabled: !dev,
                content: [
                    `${resolve(__dirname, '..', 'components')}/**/*.{vue,js}`,
                    `${srcDir}/components/**/*.{vue,js}`,
                    `${srcDir}/layouts/**/*.vue`,
                    `${srcDir}/pages/**/*.vue`,
                    `${srcDir}/plugins/**/*.{js,ts}`,
                    `${rootDir}/nuxt.config.{js,ts}`
                ],
                options: {
                    safelist: {
                        standard: [/gap-/, /grid-cols-/, /col-span-/]
                    }
                }
            }
        }

        this.options.awesIo.screens = resolveConfig(
            tailwindConfig
        ).theme.screens

        this.nuxt.options.css.unshift(
            resolve(__dirname, '..', 'assets', 'css', 'main.css')
        )

        postcss.preset.stage = 1
        postcss.plugins = postcss.plugins || {}

        postcss.plugins = mergeDeepRight(
            {
                'postcss-import': {},
                'postcss-nested': {},
                'postcss-each': {},
                'postcss-simple-vars': {},
                'postcss-easings': {}
                // 'postcss-custom-properties': {}
            },
            postcss.plugins
        )

        postcss.plugins.tailwindcss = tailwindConfig

        // include last
        postcss['postcss-color-function'] = {}
    })

    /**
     * Add modules
     */
    this.requireModule('@nuxtjs/axios')
    this.requireModule('@nuxtjs/svg-sprite')

    /**
     * Add extend webpack aliases
     */
    this.nuxt.hook('webpack:config', ($configs) => {
        $configs[0].resolve.alias = {
            ...$configs[0].resolve.alias,
            '@AwConfig': resolve(__dirname, '..', 'components', '_config.js'),
            '@AwMixins': resolve(__dirname, '..', 'mixins'),
            '@AwUtils': resolve(__dirname, '..', 'assets', 'js'),
            '@AwAtoms': resolve(__dirname, '..', 'components', '1_atoms'),
            '@AwMolecules': resolve(
                __dirname,
                '..',
                'components',
                '2_molecules'
            ),
            '@AwOrganisms': resolve(
                __dirname,
                '..',
                'components',
                '3_organisms'
            ),
            '@AwPages': resolve(__dirname, '..', 'components', '4_pages'),
            '@AwLayouts': resolve(__dirname, '..', 'components', '5_layouts')
        }
    })

    /**
     * Add layouts
     */
    const layoutsPath = join(__dirname, '/layouts')

    for (const file of readdirSync(layoutsPath)) {
        if (
            existsSync(
                join(this.options.srcDir, this.options.dir.layouts, file)
            )
        )
            continue

        this.addLayout(
            {
                src: resolve(layoutsPath, file),
                fileName: join(MODULE_DIR, file)
            },
            file.replace('.vue', '')
        )
    }

    // fix error path
    this.options.ErrorPage = resolve(
        this.options.rootDir,
        this.options.buildDir,
        MODULE_DIR,
        'error.vue'
    )

    /**
     * Register dynamic components
     */
    this.nuxt.hook('components:dirs', (dirs) => {
        dirs.push(
            {
                path: resolve(__dirname, '..', 'components', '1_atoms'),
                pattern: '**/Aw*.vue',
                global: true
            },
            {
                path: resolve(__dirname, '..', 'components', '2_molecules'),
                pattern: '**/Aw*.vue',
                global: true
            },
            {
                path: resolve(__dirname, '..', 'components', '3_organisms'),
                pattern: '**/Aw*.vue'
            },
            {
                path: resolve(__dirname, '..', 'components', '4_pages'),
                pattern: '**/Aw*.vue'
            },
            {
                path: resolve(__dirname, '..', 'components', '5_layouts'),
                pattern: '**/Aw*.vue'
            }
        )
    })

    /**
     * Add static translations
     */
    this.options.awesIo.langStatic = this.options.awesIo.langStatic || {}

    for (const locale of this.options.awesIo.lang.locales) {
        const code = locale.code || locale

        try {
            const { default: translation } = await import(
                '@awes-io/ui/lang/' + code
            )
            this.options.awesIo.langStatic[code] = translation || {}
        } catch (e) {
            console.warn(
                'Awes.io/UI: No default translation for ' + code + ' locale'
            )
        }
    }

    /**
     * Add plugins sorter (axios should be first)
     */
    const oldExtend = this.options.extendPlugins
    this.options.extendPlugins = (plugins) => {
        if (typeof oldExtend === 'function') {
            plugins = oldExtend(plugins)
        }

        const sorted = partition((plugin) => {
            const src = plugin.src || plugin || ''
            return src.includes('axios')
        }, plugins).flat()

        return sorted
    }

    /**
     * Add plugins after modules loaded
     */

    this.nuxt.hook('modules:done', async () => {
        await this.nuxt.callHook('awesIo:staticTranslations')

        const templatesPath = join(__dirname, 'templates')

        for (const file of readdirSync(templatesPath)) {
            if (!endsWith('plugin.js', file)) continue

            this.addPlugin({
                src: resolve(templatesPath, file),
                fileName: join(MODULE_DIR, file),
                options: this.options.awesIo
            })
        }
    })
}

AwesIoUi.meta = JSON.parse(
    readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8')
)

export default AwesIoUi
