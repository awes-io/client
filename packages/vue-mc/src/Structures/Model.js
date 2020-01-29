import Vue from 'vue'
import { Model as VueMCModel } from 'vue-mc'
import Request from './Request'

export default class Model extends VueMCModel {
    createRequest(config) {
        return new Request(config, Vue.prototype.$nuxt.$axios)
    }
}
