import Vue from 'vue'
import { pathOr } from 'rambdax'
import AwNotyContainer from '../../components/AwNotyContainer.vue'

export class Notification {
    constructor(defaults) {
        this.defaults = {
            timeout: 5000,
            icon: 'check-circle',
            type: 'info',
            ...defaults
        }
        this.containers = {}
    }

    add(noty) {
        const position = pathOr('default', 'position', noty)

        const container =
            this.containers[position] || this._initContainer(position)

        if (container) {
            return container.add({ ...this.defaults, ...noty })
        }
    }

    _initContainer(name) {
        if (typeof window === 'undefined') {
            return null
        }

        const container = new Vue(AwNotyContainer)

        container.$options.position = name

        document.body.appendChild(container.$mount().$el)

        this.containers[name] = container

        return container
    }
}

export default Notification
