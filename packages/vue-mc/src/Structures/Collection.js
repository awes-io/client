import Vue from 'vue'
import { Collection } from 'vue-mc'
import Request from './Request'

export default class BaseCollection extends Collection {
    createRequest(config) {
        return new Request(config, Vue.prototype.$nuxt.$axios)
    }
}
