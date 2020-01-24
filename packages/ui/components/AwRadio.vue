<template>
    <div class="aw-switch-field is-radio" :class="wrapperClasses">
        <input
            class="aw-switch-field__element"
            type="radio"
            v-bind="{ value, checked: isChecked, ...skipAttr, ...$attrs }"
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
import FieldMixin from '../mixins/field'
import ErrorMixin from '../mixins/error'

export default {
    name: 'AwRadio',

    mixins: [FieldMixin, ErrorMixin],

    model: {
        prop: 'checked',
        event: 'change'
    },

    props: {
        value: {
            type: [String, Number],
            default: 'on'
        },

        checked: [String, Number]
    },

    computed: {
        wrapperClasses() {
            return { 'has-error': this.hasError }
        },

        isChecked() {
            return this.checked === this.value
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
        _onChange() {
            if (this.hasError) {
                this.setError('')
            }
            this.$emit('change', this.value)
        }
    }
}
</script>
