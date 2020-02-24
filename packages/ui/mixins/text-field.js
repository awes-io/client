import FieldMixin from './field'
import ErrorMixin from './error'

export default {
    mixins: [FieldMixin, ErrorMixin],

    props: {
        value: {
            default: ''
        }
    },

    data() {
        return {
            // next line is for preserving autofilled values when v-model is missing
            inputValue: this.value,
            autoFilled: false
        }
    },

    computed: {
        wrapperClasses() {
            return [
                {
                    'is-filled':
                        this.autoFilled ||
                        (typeof this.inputValue !== 'undefined' &&
                            this.inputValue !== '')
                },
                { 'has-label': !!this.label },
                { 'has-error': this.hasError },
                { 'is-disabled': this.isDisabled }
            ]
        },

        isDisabled() {
            switch (typeof this.$attrs.disabled) {
                case 'undefined':
                    return false
                case 'boolean':
                    return this.$attrs.disabled
                case 'string':
                    return true
                default:
                    return !!this.$attrs.disabled
            }
        },

        mergedListeners() {
            return {
                ...this.$listeners,
                input: this._onInput,
                change: this._onInput,
                invalid: this._onInvalid,
                animationstart: this._autoFillHack
            }
        }
    },

    watch: {
        value: {
            handler(newValue) {
                this.inputValue = newValue
            },
            immediate: true
        }
    },

    methods: {
        _onInput($event) {
            let value = $event.target.value
            this.inputValue = value
            if (this.hasError) {
                this.setError('')
            }
            this.$emit($event.type, value)
        },

        _autoFillHack($event) {
            switch ($event.animationName) {
                case 'autoFillStart':
                    this.autoFilled = true
                    break
                case 'autoFillEnd':
                    this.autoFilled = false
                    break
            }
        }
    }
}
