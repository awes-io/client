<template>
    <div class="aw-switch-field is-checkbox" :class="wrapperClasses">
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
                class="aw-switch-field__element"
                type="checkbox"
                v-bind="{ value, checked: isChecked, ...skipAttr, ...$attrs }"
                :id="id || defaultId"
                :aria-describedby="errorText ? errorId : null"
                v-tooltip:top-start.show="errorTooltip"
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
        </slot>
    </div>
</template>

<script>
import FieldMixin from '../mixins/field'
import ErrorMixin from '../mixins/error'

export default {
    name: 'AwCheckbox',

    mixins: [FieldMixin, ErrorMixin],

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        // Value that checkbox emits when checked
        value: {
            type: String,
            default: 'on'
        },

        checked: {
            type: [Array, Boolean, Number],
            default: false
        }
    },

    computed: {
        _tooltipOffset() {
            return null
        },

        wrapperClasses() {
            return {
                'fb-field': !this.$slots.default,
                'has-error': this.hasError
            }
        },

        isChecked() {
            return Array.isArray(this.checked)
                ? this.checked.includes(this.value)
                : !!this.checked
        },

        mergedListeners() {
            return {
                ...this.$listeners,
                change: this._onChange,
                invalid: this._onInvalid
            }
        }
    },

    methods: {
        _onChange($event) {
            let value = this._createValue($event.target.checked)

            if (typeof value === 'undefined') return

            if (this.hasError) {
                this.setError('')
            }

            this.$emit('change', value)
        },

        _createValue(isChecked) {
            if (Array.isArray(this.checked)) {
                let index = this.checked.indexOf(this.value)

                if (isChecked && index === -1) {
                    return this.checked.concat(this.value)
                } else if (!isChecked && index > -1) {
                    let result = this.checked.slice()

                    if (index > -1) {
                        result.splice(index, 1)
                    }

                    return result
                }
            } else {
                return typeof this.checked === 'number'
                    ? Number(isChecked)
                    : isChecked
            }
        }
    }
}
</script>
