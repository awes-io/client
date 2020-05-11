import { resolve, join } from 'path'
import { normalizeOptions } from './utils/options'

const meta = require('../package.json')

function AwesIoDayjs(_options = {}) {
    // Merge options
    const options = normalizeOptions(this.options, _options)

    // Add Nuxtjs plugin
    const { dst } = this.addTemplate({
        src: resolve(__dirname, './plugins/dayjs.js'),
        fileName: join('awes-io', 'dayjs-plugin.js'),
        options
    })

    this.options.plugins.push(join(this.options.buildDir, dst))
}

AwesIoDayjs.meta = meta

export default AwesIoDayjs
