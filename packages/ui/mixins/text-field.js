import { isNil } from 'rambdax'
import FieldMixin from './field'
import ErrorMixin from './error'

export default {
    mixins: [FieldMixin, ErrorMixin],

    props: {
        value: {
            default: ''
        },

        /**
         * Applys String mask or filter RegExp pattern for input value
         */
        pattern: {
            type: [String, RegExp],
            default: null
        },

        /**
         * RegExp tokens to recognize in String mask
         * {
         *     [token]: { pattern: <RegExp>, transform?: <Function> }
         * }
         */
        maskTokens: {
            type: Object,
            default() {
                return {
                    '#': { pattern: /\d/ },
                    X: { pattern: /[0-9a-zA-Z]/ },
                    S: { pattern: /[a-zA-Z]/ },
                    A: {
                        pattern: /[a-zA-Z]/,
                        transform: v => v.toLocaleUpperCase()
                    },
                    a: {
                        pattern: /[a-zA-Z]/,
                        transform: v => v.toLocaleLowerCase()
                    },
                    '!': { escape: true }
                }
            }
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
                        (!isNil(this.inputValue) && this.inputValue !== '')
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
            const value = this._applyFormat($event.target.value)
            $event.target.value = value
            const eventType = $event.type

            if (this.hasError) {
                this.setError('')
            }

            if (this.$listeners[eventType]) {
                this.$emit(eventType, value)
            } else {
                this.inputValue = value
            }
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
        },

        _applyFormat(value) {
            // mask
            if (typeof this.pattern === 'string') {
                return this._mask(value, this.pattern)
            }

            // regex pattern
            if (this.pattern instanceof RegExp) {
                const match = this.pattern.exec(value)
                this.pattern.lastIndex = 0 // reset for next cycles

                return match ? match[0] : ''
            }

            return value
        },

        _mask(value, mask, masked = true) {
            value = value || ''
            mask = mask || ''
            let iMask = 0
            let iValue = 0
            let output = ''

            while (iMask < mask.length && iValue < value.length) {
                let cMask = mask[iMask]
                let masker = this.maskTokens[cMask]
                let cValue = value[iValue]

                if (masker && !masker.escape) {
                    if (masker.pattern.test(cValue)) {
                        output += masker.transform
                            ? masker.transform(cValue)
                            : cValue
                        iMask++
                    }
                    iValue++
                } else {
                    if (masker && masker.escape) {
                        iMask++ // take the next mask char and treat it as char
                        cMask = mask[iMask]
                    }
                    if (masked) output += cMask
                    if (cValue === cMask) iValue++ // user typed the same char
                    iMask++
                }
            }

            // fix mask that ends with a char: (#)
            let restOutput = ''

            while (iMask < mask.length && masked) {
                let cMask = mask[iMask]
                if (this.maskTokens[cMask]) {
                    restOutput = ''
                    break
                }
                restOutput += cMask
                iMask++
            }

            return output + restOutput
        }
    }
}
