import Vue from 'vue'
import axios from 'axios'

const testAxios = axios.create() // fresh instance without interceptor
const getNuxt = () => Vue.prototype.$nuxt || { isOnline: true } // return mock for fallback
const TEST_URL = '<%= options.testUrl || "http://httpbin.org/get" %>'
const TEST_INTERVAL = parseInt('<%= options.interval %>') || 5000
const MAX_TRIES = parseFloat('<%= options.maxTries %>') // parseFloat to support Infinity

let tm
let tries = 0

const testNetwork = () =>
    testAxios
        .get(TEST_URL)
        .then(() => {
            tries = 0
            getNuxt().isOnline = true
        })
        .catch(() => {
            tries++
            getNuxt().isOnline = false

            if (tries < MAX_TRIES) {
                tm = setTimeout(testNetwork, TEST_INTERVAL)
            }
        })

export default ({ $axios }) => {
    if ($axios) {
        // do not apply interceptor if can't try to test connection
        if (!MAX_TRIES) return

        $axios.interceptors.response.use(
            response => {
                const nuxt = getNuxt()

                if (!nuxt.isOnline) {
                    clearTimeout(tm)
                    tries = 0
                    nuxt.isOnline = true
                }

                return Promise.resolve(response)
            },
            error => {
                if (getNuxt().isOnline && error.message === 'Network Error') {
                    testNetwork()
                }

                return Promise.reject(error)
            }
        )
    } else {
        console.warn(
            'axios not found in context, no offline interceptor will be added'
        )
    }
}
