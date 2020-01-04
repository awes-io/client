import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import AwesUi from './entry'
import App from './App.vue'
import lang from '../lang/en'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(AwesUi)

Vue.prototype.$axios = axios

const router = new VueRouter({
    mode: 'history'
})

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: lang
    }
})

const store = new Vuex.Store({
    modules: {}
})

window.app = new Vue({
    router,
    store,
    i18n,
    render(h) {
        return h(App)
    }
})

window.app.$mount('#app')
