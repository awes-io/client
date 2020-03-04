<template>
    <!-- temporary remove .native modifier for future research (routes won`t work) -->
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component
        :class="classes"
        v-bind="componentProps"
        v-on="$listeners"
        :disabled="$attrs.disabled || loading"
        @mousedown="_setPressed"
        @mouseup="_setPressed"
        @touchstart="_setPressed"
        @touchend="_setPressed"
    >
        <span :class="elClasses.overlay"></span>

        <AwSvgImage
            v-if="loading"
            name="spinner"
            slot="left"
            class="h-5 w-5 inline-block mr-1"
        />

        <span :class="elClasses.content" tabindex="-1">
            <AwIcon
                v-if="icon && !loading"
                :name="icon"
                :class="{ 'mr-1': theme !== 'icon' }"
            />
            <span
                :class="[
                    { 'sr-only': theme === 'icon' && icon },
                    elClasses.text
                ]"
            >
                <slot v-if="!loading">{{ text }}</slot>
                <span v-else>LOADING</span>
            </span>
        </span>
    </component>
</template>

<script>
import AwLink from './AwLink.vue'
import { AwButton as _config } from './_config'
import { getBemClasses } from '../assets/js/css'

export default {
    name: 'AwButton',

    extends: AwLink,

    _config,

    props: {
        // Possible values: 'sm', 'md', 'lg'
        size: {
            type: String,
            default() {
                return this.$options._config.size
            }
        },

        // Background color of button. Possible values: 'info', 'success', 'warning', 'error'
        color: {
            type: String,
            default() {
                return this.$options._config.color
            }
        },

        // Possible values: outline, ghost
        theme: {
            type: String,
            default() {
                return this.$options._config.theme
            }
        },

        // Name of icon in button. Icon placed before text
        icon: {
            type: String,
            default: ''
        },

        // Indicates if loader spinner is shown
        loading: {
            type: Boolean,
            default: false
        },

        active: Boolean
    },

    data() {
        return {
            isPressed: false
        }
    },

    computed: {
        classes() {
            return [
                this.className,
                {
                    'is-pressed': this.isPressed,
                    'is-active': this.active,
                    'is-loading': this.loading
                },
                `${this.className}_${this.size}`,
                `color-${this.color || 'default'}`,
                this.theme && `theme-${this.theme}`
            ]
        },

        elClasses() {
            return getBemClasses(this.className, ['content', 'overlay', 'text'])
        }
    },

    methods: {
        _setPressed($event) {
            this.isPressed =
                $event.type === 'mousedown' || $event.type === 'touchstart'
        },

        focus() {
            if (this.$el) {
                this.$el.focus()
            }
        }
    }
}
</script>
