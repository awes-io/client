<template>
    <i :class="classes" aria-hidden="true"></i>
</template>

<script>
import { AwIcon as _config } from './_config'
import { conf } from '../assets/js/component'

export default {
    name: 'AwIcon',

    _config,

    props: {
        name: {
            type: String,
            required: true
        },

        size: {
            type: String,
            default() {
                return conf(this, 'size')
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        }
    },

    computed: {
        classes() {
            return [
                this.className,
                `${this.className}-${this.name}`,
                `text-${this.size}`
            ]
        }
    }
}
</script>
