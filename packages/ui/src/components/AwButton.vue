<template>
    <!-- temporary remove .native modifier for future research (routes won`t work) -->
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component
        :class="classes"
        v-bind="componentProps"
        :style="elStyle"
        v-on="mergedListeners"
        @mousedown="_setPressed"
        @mouseup="_setPressed"
        @touchstart="_setPressed"
        @touchend="_setPressed"
    >
        <span :class="elClasses.overlay"></span>
        <span :class="elClasses.content">
            <AwIcon
                v-if="icon"
                :name="icon"
                :class="{ 'mr-1': theme !== 'icon' }"
            />
            <span
                :class="[
                    { 'sr-only': theme === 'icon' && icon },
                    elClasses.text
                ]"
            >
                <slot>{{ text }}</slot>
            </span>
        </span>
        <span ref="ripple" :class="elClasses.ripple"></span>
    </component>
</template>

<script>
import AwLink from './AwLink.vue'
import { AwButton as _config } from './_config'
import { getBemClasses } from '~/assets/js/css'
import { conf } from '~/assets/js/component'

export default {
    name: 'AwButton',

    extends: AwLink,

    _config,

    props: {
        size: {
            type: String,
            default() {
                return this.$options._config.size
            }
        },

        color: {
            type: String,
            default() {
                return this.$options._config.color
            }
        },

        theme: {
            type: String,
            default() {
                return this.$options._config.theme
            }
        },

        icon: {
            type: String,
            default: ''
        },

        active: Boolean
    },

    data() {
        return {
            isPressed: false,
            showRipple: false,
            clickCoords: {
                x: 0,
                y: 0
            }
        }
    },

    computed: {
        classes() {
            return [
                this.className,
                {
                    'is-pressed': this.isPressed,
                    'has-ripple': this.showRipple,
                    'is-active': this.active
                },
                `${this.className}_${this.size}`,
                `color-${this.color}`,
                `theme-${this.theme}`
            ]
        },

        elClasses() {
            return getBemClasses(this.className, [
                'content',
                'overlay',
                'ripple',
                'text'
            ])
        },

        elStyle() {
            return {
                '--ripple-x': `${this.clickCoords.x}px`,
                '--ripple-y': `${this.clickCoords.y}px`
            }
        },

        _rippleListeners() {
            return this.componentProps.is !== conf(this, 'routerComponent')
                ? {
                      mousedown: this._setPressed,
                      mouseup: this._setPressed,
                      touchstart: this._setPressed,
                      touchend: this._setPressed
                  }
                : {}
        },

        mergedListeners() {
            return {
                ...this._rippleListeners,
                ...this.$listeners
            }
        }
    },

    methods: {
        _setPressed($event) {
            if ($event.type === 'mousedown' || $event.type === 'touchstart') {
                // hide ripple
                this.showRipple = false
                this._toggleRippleListener(false)

                // set pressed state and show ripple for transition
                this.isPressed = true

                // set coordiantes
                const pos = this.$el.getBoundingClientRect()
                this.clickCoords = {
                    x: $event.clientX - pos.x,
                    y: $event.clientY - pos.y
                }

                this._raf = requestAnimationFrame(() => {
                    this.showRipple = true
                })
            } else {
                // remove pressed state
                this.isPressed = false

                // remove ripple after transition
                this._raf = requestAnimationFrame(this._toggleRippleListener)
            }
        },

        _removeRipple() {
            this.showRipple = false
            this._toggleRippleListener(false)
        },

        _toggleRippleListener(on = true) {
            this.$refs.ripple[`${on ? 'add' : 'remove'}EventListener`](
                'transitionend',
                this._removeRipple
            )
        },

        focus() {
            if (this.$el) {
                this.$el.focus()
            }
        }
    },

    beforeDestroy() {
        this._toggleRippleListener(false)
        cancelAnimationFrame(this._raf)
    }
}
</script>
