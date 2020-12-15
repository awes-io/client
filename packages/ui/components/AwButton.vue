<template>
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

        <AwSvgImage v-if="loading" :class="elClasses.loader" name="loader" />

        <span
            :class="[
                elClasses.content,
                `${elClasses.content}_${size}`,
                { [`${elClasses.content}_no-text`]: mobileTextHidden },
                { 'opacity-0': loading },
                contentClass
            ]"
            tabindex="-1"
        >
            <slot name="icon">
                <AwIcon v-if="icon" :name="icon" class="flex-shrink-0" />
            </slot>

            <span
                :class="[
                    { 'hidden lg:block': mobileTextHidden },
                    { 'sr-only': theme === 'icon' && icon },
                    {
                        'ml-1': icon && (text || $slots.default)
                    },
                    elClasses.text
                ]"
            >
                <slot>{{ text }}</slot>
            </span>
        </span>
    </component>
</template>

<script>
import AwLink from './AwLink.vue'
import { isType } from 'rambdax'
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

        // Background color of button. Possible values: 'info', 'success', 'warning', 'error', 'surface'
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
            type: [Boolean, String],
            default: false
        },

        // CSS class for content wrapper
        contentClass: {
            type: String,
            default: ''
        },

        // Active state
        active: Boolean,

        mobileTextHidden: Boolean
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
            return getBemClasses(this.className, [
                'content',
                'overlay',
                'text',
                'loader'
            ])
        },

        loadingText() {
            return (
                (isType('String', this.loading) && this.loading) ||
                this.$t('AwButton.loading')
            )
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
