import { pathOr, mergeDeep, isType, toPairs, equals } from 'rambdax'
import { resolve, join } from 'path'
import { moveSync, writeFileSync, removeSync } from 'fs-extra'

const meta = require('../package.json')

const DEFAULT_OPTIONS = {
    generateDir: 'storage/app/nuxt'
}

function AwesIoNuxtLaravel(_options = {}) {
    // Merge options
    const configOptions = pathOr({}, 'awesIo.nuxtLaravel', this.options)
    const mergedOptions = mergeDeep(
        mergeDeep(DEFAULT_OPTIONS, configOptions),
        _options
    )

    // Update working directories
    this.options.generate.dir = join(
        this.options.rootDir,
        mergedOptions.generateDir
    )

    // Include @nuxtjs/axios and configure proxy
    this.options.axios = mergeDeep(pathOr({}, 'axios', this.options), {
        baseURL: '/',
        proxy: true
    })

    let proxyOptions = this.options.dev
        ? [
              [
                  '/api',
                  {
                      target: process.env.LARAVEL_URL,
                      changeOrigin: true
                  }
              ]
          ]
        : [
              [
                  ['**/*', `!${this.options.publicPath}`],
                  {
                      target: process.env.LARAVEL_URL
                  }
              ]
          ]

    if (this.options.proxy) {
        const options = isType('Array', this.options.proxy)
            ? this.options.proxy
            : toPairs(this.options.proxy)

        proxyOptions = proxyOptions
            .concat(options)
            .filter(([_url], index, proxys) => {
                const _index = proxys.findIndex(([__url]) =>
                    equals(_url, __url)
                )
                return _index === index
            })
    }

    this.options.proxy = proxyOptions

    this.requireModule('@nuxtjs/axios')

    // Add version plugin
    if (mergedOptions.versionPlugin !== false) {
        const { rootDir } = this.options
        const rootPackageJson = require(join(rootDir, './package.json'))
        const { name, version, date } = pathOr(
            {},
            'versionPlugin',
            mergedOptions
        )
        const { APP_VERSION, APP_NAME, APP_VERSION_DATE } = process.env

        const versionPluginOptions = {
            name: name || APP_NAME || rootPackageJson.name,
            version: version || APP_VERSION || 'v' + rootPackageJson.version,
            date: date || APP_VERSION_DATE || new Date().toISOString()
        }

        this.addPlugin({
            src: resolve(__dirname, '../plugins/version.js'),
            mode: 'client',
            fileName: join('awes-io', 'version'),
            options: versionPluginOptions
        })
    }

    // Configure work with Laravel
    if (this.options.dev) {
        this.extendRoutes(routes => {
            const index = routes.find(
                route =>
                    route.path === '/' ||
                    (route.name && route.name.match(/^index-\w+$/))
            )
            routes.push(
                Object.assign({}, index, {
                    name: '__base_nuxt__',
                    path: this.options.build.publicPath
                })
            )
        })
    } else {
        const publicPath = resolve('public' + this.options.build.publicPath)

        this.nuxt.hook('generate:done', async () => {
            const { html } = await this.nuxt.renderer.renderRoute('/', {
                url: '/'
            })

            moveSync(
                resolve(
                    this.options.generate.dir + this.options.build.publicPath
                ),
                publicPath,
                {
                    overwrite: true
                }
            )

            writeFileSync(resolve(publicPath, 'index.html'), html)

            removeSync(resolve(this.options.generate.dir))
        })
    }
}

AwesIoNuxtLaravel.meta = meta

export default AwesIoNuxtLaravel
