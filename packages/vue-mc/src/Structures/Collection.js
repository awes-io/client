import Vue from 'vue'
import { Collection as VueMCCollection } from 'vue-mc'
import Request from './Request'

export default class Collection extends VueMCCollection {
    createRequest(config) {
        return new Request(config, Vue.prototype.$nuxt.$axios)
    }
}
