import { resolve, join } from 'path'
import { addNuxtI18nOptions, getTemplateOptions } from './utils/options'

const meta = require('../package.json')

function AwesIoNuxtI18n(_options = {}) {
    // Add nuxt-i18n options to global options and call module
    addNuxtI18nOptions(this.options, _options)
    this.requireModule('nuxt-i18n')

    // Get template options
    const { locales, ...options } = getTemplateOptions(this.options, _options)

    // Add lang file for each locale
    locales.forEach(({ file, domain, code }) => {
        this.addTemplate({
            src: resolve(__dirname, './template/translations.js'),
            fileName: join('awes-io', 'lang', file),
            options: {
                ...options,
                domain,
                path: options.url.replace('{locale}', code)
            }
        })
    })
}

AwesIoNuxtI18n.meta = meta

export default AwesIoNuxtI18n
