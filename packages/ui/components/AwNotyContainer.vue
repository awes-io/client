<template>
    <TransitionGroup
        :class="positionClass"
        tag="ul"
        name="aw-noty"
        class="aw-noty-container"
        aria-live="polite"
        aria-relevant="additions"
    >
        <li
            v-for="item in stack"
            class="aw-noty-container__item"
            :key="item.id"
        >
            <slot v-bind="item">
                <AwNoty v-bind="item" />
            </slot>
        </li>
    </TransitionGroup>
</template>

<script>
import { isType } from 'rambdax'
import AwNoty from './AwNoty.vue'

let _notifyId = 0

export default {
    name: 'AwNotyContainer',

    components: { AwNoty },

    data() {
        return {
            stack: []
        }
    },

    beforeDestroy() {
        this.stack.forEach(item => {
            clearTimeout(item.timeout)
        })
        this.stack = []
    },

    computed: {
        positionClass() {
            return this.$options.position
                ? this.$options.position
                      .split(' ')
                      .filter(Boolean)
                      .map(cls => `aw-noty-container_${cls}`)
                : null
        }
    },

    methods: {
        add(item) {
            if (!isType('Object', item)) {
                throw new TypeError('item must be an object')
            }

            const id = _notifyId++
            item.id = id

            const removeAfter = parseInt(item.timeout)
            if (removeAfter && !isNaN(removeAfter)) {
                item.timeout = setTimeout(this.remove, removeAfter, id)
            }

            item.remove = () => this.remove(id)

            this.stack.push(item)

            return item.remove
        },

        remove(id) {
            let i = this.stack.findIndex(item => item.id === id)

            if (i > -1) {
                clearTimeout(this.stack[i].timeout)
                this.stack.splice(i, 1)
                return true
            }

            return false
        }
    }
}
</script>
