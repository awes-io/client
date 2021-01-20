<template>
    <div
        class="aw-text-field is-tel relative"
        :class="{ 'has-error': hasError }"
        @invalid.capture="_onInvalid"
    >
        <VueTelInput
            v-tooltip.show.prepend="errorTooltip"
            v-bind="props"
            v-on="listeners"
        />
    </div>
</template>

<script>
import errorMixin from '@AwMixins/error'
import fieldMixin from '@AwMixins/field'

export default {
    name: 'AwTel',

    inheritAttrs: false,

    components: {
        VueTelInput: () =>
            import('vue-tel-input').then(({ VueTelInput }) => VueTelInput)
    },

    mixins: [errorMixin, fieldMixin],

    props: {
        autoFormat: Boolean,

        value: {}
    },

    data() {
        return {
            VueTelInput: null
        }
    },

    computed: {
        props() {
            return {
                autoFormat: this.autoFormat,
                value: this.value,
                inputOptions: {
                    ...this.$attrs,
                    ...this.skipAttr,
                    id: this.id,
                    type: 'tel',
                    placeholder: this.label,
                    styleClasses: 'aw-text-field__element p-3'
                }
            }
        },

        listeners() {
            return {
                ...this.$listeners,
                input: this._onInputProxy
            }
        }
    },

    methods: {
        // overwrite element getter from error mixin
        _getElement() {
            return this.$el && this.$el.querySelector('input[type="tel"]')
        },

        _onInputProxy(text) {
            if (this.hasError && !!text) {
                this.setError('')
            }

            if ((text || this.value) && this.value !== text) {
                this.$emit('input', ...arguments)
            }
        }
    }
}
</script>
