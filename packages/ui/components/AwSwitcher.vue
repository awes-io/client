<template>
    <div
        class="aw-switch-field is-switcher"
        :class="wrapperClasses"
        @mousedown="_onPointerDown"
        @touchstart="_onPointerDown"
    >
        <slot
            v-bind="{
                id: id || defaultId,
                checked: isChecked,
                onChange: _onChange,
                setError,
                value
            }"
        >
            <input
                ref="element"
                class="aw-switch-field__element sr-only"
                type="checkbox"
                v-bind="{ value, checked: isChecked, ...$attrs }"
                :id="id || defaultId"
                :aria-describedby="errorText ? errorId : null"
                v-on="mergedListeners"
            /><label
                v-if="!!label"
                class="aw-switch-field__label"
                :for="id || defaultId"
            >
                <slot name="label" v-bind="{ label, value, isChecked }">
                    {{ label }}
                </slot>
            </label>
            <div class="aw-switch-field__switch" aria-hidden="true">
                <span class="aw-switch-field__toggle"></span>
            </div>
        </slot>
        <slot name="error" v-if="errorText" :error="errorText">
            <span
                class="aw-error is-left has-pin-bottom-left"
                :id="errorId"
                @click="_onErrorClick"
            >
                {{ errorText }}
            </span>
        </slot>
    </div>
</template>

<script>
import AwCheckbox from './AwCheckbox.vue'

const THRESHOLD = 5 // pixels

export default {
    name: 'AwSwitcher',

    extends: AwCheckbox,

    data() {
        return {
            startPos: null,
            isTouch: false,
            isSwitched: false
        }
    },

    methods: {
        _onChange($event) {
            if ($event.isTrusted && this.isSwitched) {
                this.isSwitched = false
                return
            }

            let value = this._createValue($event.target.checked)

            if (typeof value === 'undefined') return

            if (this.hasError) {
                this.setError('')
            }

            this.$emit('change', value)
        },

        _onPointerDown($event) {
            if (this.startPos !== null) return

            this.startPos = $event.screenX
            this.isTouch = $event.type === 'touchstart'
            this.isSwitched = false

            this._toggleListeners(true, this.isTouch)
        },

        _onPointerMove($event) {
            const el = this.$refs.element
            const diff = $event.screenX - this.startPos

            if (el.checked && diff < -1 * THRESHOLD) {
                el.checked = false
                this.isSwitched = true
            } else if (!el.checked && diff > THRESHOLD) {
                el.checked = true
                this.isSwitched = true
            }
        },

        _onPointerUp() {
            const checked = this.$refs.element.checked
            if (this.isSwitched) {
                setTimeout(() => this._onChange({ target: { checked } }), 10)
            }

            this._toggleListeners(false, this.isTouch)
            this.startPos = null
        },

        _toggleListeners(on = false, isTouch = false) {
            const events = [
                {
                    type: isTouch ? 'touchmove' : 'mousemove',
                    handler: this._onPointerMove
                },
                {
                    type: isTouch ? 'touchend' : 'mouseup',
                    handler: this._onPointerUp
                }
            ]

            events.forEach(({ type, handler }) => {
                window[on ? 'addEventListener' : 'removeEventListener'](
                    type,
                    handler
                )
            })
        }
    },

    beforeDestroy() {
        this._toggleListeners(false, this.isTouch)
    }
}
</script>
