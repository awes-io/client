<template>
    <div :class="wrapperClasses" class="flex items-center -mx-1">
        <input
            class="sr-only"
            v-bind="$attrs"
            :value="cleanValue"
            v-on="mergedListeners"
            ref="element"
            tabindex="-1"
        />
        <template v-for="(char, i) in pattern">
            <span v-if="char === '-'" :key="`d-${i}`" class="mx-1">-</span>
            <div v-else :key="`i-${i}`" class="mx-1">
                <input
                    ref="fields"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    maxlength="1"
                    autocomplete="off"
                    :value="codeValue[i]"
                    :class="[elClasses.element, 'text-center p-3']"
                    v-bind="skipAttr"
                    @input="_onInput($event, i)"
                    @keydown.left="_focus($event.target, -1)"
                    @keydown.right="_focus($event.target)"
                    @keydown.backspace="_focus($event.target, -1)"
                    @paste.prevent="_onPaste"
                />
            </div>
        </template>
        <slot name="error" v-if="errorText" :error="errorText">
            <span
                class="aw-error is-center has-pin-bottom-center"
                :id="errorId"
                @click="_onErrorClick"
            >
                {{ errorText }}
            </span>
        </slot>
    </div>
</template>

<script>
import { conf } from '../assets/js/component'
import { getBemClasses } from '../assets/js/css'
import { AwCode as _config } from './_config'
import errorMixin from '../mixins/error'
import fieldMixin from '../mixins/field'

const SPACER_RE = /-/g

export default {
    name: 'AwCode',

    _config,

    mixins: [fieldMixin, errorMixin],

    props: {
        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        },

        pattern: {
            type: String,
            default() {
                return conf(this, 'pattern')
            }
        }
    },

    data() {
        return {
            codeValue: this.pattern
                .split('')
                .map(v => (SPACER_RE.test(v) && '-') || '')
        }
    },

    computed: {
        mergedListeners() {
            return {
                ...this.$listeners,
                focus: this._focus,
                invalid: this._onInvalid
            }
        },

        inputValue: {
            get() {
                return this.codeValue.join('')
            },
            set(value) {
                value = value.trim()

                for (
                    let i = 0, j = 0, max = this.pattern.length;
                    i < max;
                    i++
                ) {
                    if (SPACER_RE.test(this.pattern[i])) {
                        continue
                    }
                    this.$set(this.codeValue, i, value[j])
                    j++
                }
            }
        },

        cleanValue() {
            return this.inputValue.replace(SPACER_RE, '')
        },

        elClasses() {
            return getBemClasses(this.className, ['element'])
        },

        wrapperClasses() {
            return [
                this.className,
                {
                    'has-error': this.hasError
                }
            ]
        },

        length() {
            return this.pattern.replace(SPACER_RE, '').length
        }
    },

    watch: {
        codeValue() {
            this.$emit('input', this.cleanValue)
            if (this.cleanValue.length === this.length) {
                this.$emit('change', this.cleanValue)
            }
        }
    },

    methods: {
        _onInput($event, index) {
            const field = $event.target
            const parsed = field.value.replace(/\D/g, '')

            // immedate update to prevent blinking
            field.value = parsed
            this.$set(this.codeValue, index, parsed)

            // go to next field if current is not empty
            if (parsed.length === field.maxLength) {
                this._focus(field)
            }

            // reset error if exists
            if (this.hasError) {
                this.setError('')
            }
        },

        _focus(currentField, increment = 1) {
            const nextIndex =
                this.$refs.fields.indexOf(currentField) + increment
            const next = this.$refs.fields[nextIndex]

            if (next) {
                setTimeout(() => {
                    next.focus()
                    next.setSelectionRange(0, next.value.length)
                }, 10)
            }
        },

        _onPaste($event) {
            // if (this.error && this.error.length) this.resetError()
            this.inputValue = $event.clipboardData.getData('text')
        }
    }
}
</script>
