import Vue from 'vue'
import { Notification } from '@awes-io/ui/assets/js/Notification'

const _config = {
    default: JSON.parse('<%= JSON.stringify(options.default) %>'),
    dark: JSON.parse('<%= JSON.stringify(options.default) %>')
}

const $awes = {
    _config
}

Vue.prototype.$awes = $awes

const Noty = new Notification()

Vue.prototype.$notify = Noty.add.bind(Noty)

export default ({ app }, inject) => {
    app.$awes = $awes
    inject('awes', $awes)
}
