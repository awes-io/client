import { keys, pathOr } from 'rambdax'
import { setConfig } from '../assets/js/component'
import * as components from '../components/index'
import tooltip from '../directives/tooltip'
import { Notification } from '../assets/js/Notification'

// Import styles
import '../assets/css/main.css'

// install function executed by Vue.use()
function install(Vue, config) {
    if (install.installed) return

    install.installed = true

    keys(components).forEach(componentName => {
        Vue.component(componentName, components[componentName])
    })

    Vue.directive('tooltip', tooltip)

    setConfig(Vue, config)

    const Noty = new Notification(pathOr({}, 'Notification', config))

    Vue.prototype.$notify = Noty.add.bind(Noty)
}

// Create module definition for Vue.use()
const plugin = {
    install
}

// To auto-install when vue is found
// window or global

let GlobalVue = null

if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}

if (GlobalVue) {
    GlobalVue.use(plugin)
}

// Default export is library as a whole, registered via Vue.use()
export default plugin

export * from '../components/index'
