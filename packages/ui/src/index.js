import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import AwesUi from './entry'
import App from './App.vue'
import { menu, default as routes } from '../pages'
import lang from '../lang/en'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(Vuex)
Vue.use(AwesUi)

Vue.prototype.$axios = axios

const router = new VueRouter({
    mode: 'history',
    routes
})

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: lang
    }
})

const store = new Vuex.Store({
    modules: {
        awesIo: {
            state: {
                menu,
                caption: 'Awes.io <strong>UI</strong>',
                navbarItems: [],
                userMenu: [
                    {
                        component: 'AwLink',
                        props: {
                            text: 'Profile',
                            href: '/profile'
                        }
                    },
                    {
                        component: 'AwLink',
                        props: {
                            text: 'Logout'
                        }
                    }
                ]
            },
            namespaced: true
        }
    }
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
