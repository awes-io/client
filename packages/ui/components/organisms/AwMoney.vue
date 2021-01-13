<template>
    <AwInput ref="input" v-bind="_awInputProps" :value="currencyValue">
        <template
            #element="{ cssClass, mergedAttributes, errorTooltip, errorText, errorId }"
        >
            <input
                ref="element"
                v-model="currencyValue"
                v-currency="_options"
                v-bind="mergedAttributes"
                v-tooltip.show.prepend="errorTooltip"
                :aria-describedby="errorText ? errorId : null"
                :class="cssClass"
                v-on="_listeners"
            />
        </template>
        <template v-for="(val, name) in _slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data" />
        </template>
    </AwInput>
</template>

<script>
import { pick, keys, omit } from 'rambdax'
import { CurrencyDirective } from 'vue-currency-input'
import AwInput from '../global/AwInput.vue'
import { AwMoney as _config } from '../_config'
import { conf } from '../../assets/js/component'

const AW_INPUT_PROPS_KEYS = keys(AwInput.props)

export default {
    name: 'AwMoney',

    _config,

    components: {
        AwInput
    },

    props: {
        ...AwInput.props,

        value: {
            type: Number,
            default: null
        },

        options: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            currencyValue: this.value
        }
    },

    directives: {
        currency: CurrencyDirective
    },

    computed: {
        _awInputProps() {
            return {
                ...this.$attrs,
                ...pick(AW_INPUT_PROPS_KEYS, this.$props)
            }
        },

        _listeners() {
            return omit('input,change', this.$listeners)
        },

        _options() {
            return {
                ...conf(this, 'options'),
                ...this.options
            }
        },

        _slots() {
            return omit('element', this.$scopedSlots)
        }
    },

    watch: {
        value(value) {
            if (!this.$refs.element) return

            if (this.$refs.input && this.$refs.input.hasError) {
                this.$refs.input.setError('')
            }

            if (this.$refs.element.$ci.getValue() !== value) {
                this.$refs.element.$ci.setValue(value)
            }
        },

        currencyValue(value) {
            if (!this.$refs.element) return

            const intValue = this.$refs.element.$ci.getValue()

            if (this.value !== value) {
                this.$emit('input', intValue, value)
            }
        }
    }
}
</script>
