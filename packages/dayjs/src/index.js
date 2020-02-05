import { resolve, join } from 'path'
import { normalizeOptions } from './utils/options'

const meta = require('../package.json')

function AwesIoDayjs(_options = {}) {
    // Merge options
    const options = normalizeOptions(this.options, _options)

    // Add Nuxtjs plugin
    this.addPlugin({
        src: resolve(__dirname, './plugins/dayjs.js'),
        fileName: join('awes-io', 'dayjs-plugin.js'),
        options
    })
}

AwesIoDayjs.meta = meta

export default AwesIoDayjs
