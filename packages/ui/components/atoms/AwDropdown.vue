<template>
    <Transition
        name="fade"
        @beforeLeave="removeOutsideClick"
        @afterEnter="setOutsideClick"
    >
        <component
            :is="tag"
            class="aw-dropdown z-30"
            v-show="visible"
            v-on="listeners"
        >
            <slot />
        </component>
    </Transition>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { AwDropdown as _config } from '../_config'
import { containsTargets } from '../../assets/js/events'

const ACTION_TAGS = ['A', 'BUTTON']

export default {
    name: 'AwDropdown',

    _config,

    props: {
        tag: {
            type: String,
            default() {
                return this.$options._config.tag
            }
        },

        target: String,

        options: Object,

        closeOnAction: {
            type: Boolean,
            default: true
        },

        show: Boolean,

        closeOutside: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            popper: null,
            targetEl: null,
            visible: false
        }
    },

    computed: {
        _popperOptions() {
            const defaults = this.$options._config.popperOptions
            const modifiers = Array.isArray(defaults.modifiers)
                ? defaults.modifiers.slice()
                : []

            if (
                this.options &&
                Array.isArray(this.options.modifiers) &&
                this.options.modifiers.length
            ) {
                for (let i = this.options.modifiers.length - 1; i >= 0; i--) {
                    const modifier = this.options.modifiers[i]
                    const index = modifiers.findIndex(
                        ({ name }) => name === modifier.name
                    )

                    if (index !== -1) {
                        modifiers.splice(index, 1, modifier)
                    } else {
                        modifiers.push(modifier)
                    }
                }
            }

            return {
                ...defaults,
                ...this.options,
                modifiers
            }
        },

        listeners() {
            const listeners = {}

            if (this.closeOnAction) {
                listeners.click = this._onClickAction
            }

            return listeners
        }
    },

    watch: {
        visible(isVisible) {
            if (isVisible && !this.popper) {
                this._createPopper()
            } else if (isVisible) {
                this.popper.update()
            }

            // sync show prop
            this.$emit('update:show', isVisible)
        },

        show(value) {
            this.visible = value
        }
    },

    beforeDestroy() {
        this.removeOutsideClick()
        this._destroyPopper()
    },

    methods: {
        _getTargetEl() {
            if (this.target) {
                return document.querySelector(this.target)
            } else {
                return this.$el && this.$el.previousElementSibling
            }
        },

        _createPopper() {
            this.targetEl = this._getTargetEl()

            if (this.$el && this.targetEl) {
                this.popper = createPopper(
                    this.targetEl,
                    this.$el,
                    this._popperOptions
                )
            }
        },

        _destroyPopper() {
            this.targetEl = null
            if (this.popper) this.popper.destroy()
        },

        _onClickOutside($event) {
            if (
                this.$el.contains($event.target) ||
                (this.targetEl && this.targetEl === $event.target) ||
                (this.targetEl && this.targetEl.contains($event.target))
            ) {
                return
            }

            this.visible = false
        },

        _onClickAction($event) {
            if (containsTargets(ACTION_TAGS, $event)) {
                this.visible = false
            }
        },

        update() {
            if (this.popper) this.popper.forceUpdate()
        },

        setOutsideClick() {
            this.closeOutside &&
                document.body.addEventListener(
                    'click',
                    this._onClickOutside,
                    true
                )
        },

        removeOutsideClick() {
            this.closeOutside &&
                document.body.removeEventListener(
                    'click',
                    this._onClickOutside,
                    true
                )
        },
        /**
         * @vuese
         * toggle the dropdown
         */
        toggle() {
            this.visible = !this.visible
        }
    }
}
</script>
