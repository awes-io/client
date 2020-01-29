<template>
    <form
        :method="method"
        :action="url"
        :class="[className, { 'is-loading': loading }]"
        v-on="listeners"
    >
        <div
            v-if="errorsList.length"
            class="px-4 py-2 text-sm bg-error mb-2 rounded"
        >
            <p v-for="(err, i) in errors" :key="i">
                {{ err }}
            </p>
        </div>
        <slot />
    </form>
</template>

<script>
import { AwForm as _config } from './_config'
import { conf } from '../assets/js/component'
import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'
import { isFalsy, path } from 'rambdax'

const FIELDS_SELECTOR = [
    'input:not([type="hidden"]):not([type="file"])',
    'select',
    'textarea'
]
    .map(
        selector => `${selector}:not([${FORM_ENTER_SKIP_ATTR}]):not([disabled])`
    )
    .join(', ')

export default {
    name: 'AwForm',

    _config,

    props: {
        url: String,

        method: {
            type: String,
            default() {
                return conf(this, 'method')
            },
            validator(method) {
                return ['get', 'post', 'delete', 'patch'].includes(
                    method.toLowerCase()
                )
            }
        },

        className: {
            type: String,
            default() {
                return conf(this, 'baseClass')
            }
        }
    },

    data() {
        return {
            loading: false,
            errors: null
        }
    },

    computed: {
        listeners() {
            return {
                mousedown: this._onSubmitBtnClick,
                submit: this._submit,
                keydown: this._onEnterKeydown,
                ...this.$listeners
            }
        },

        errorsList() {
            if (!isFalsy(this.errors)) {
                return Object.values(this.errors).filter(Boolean)
            }
            return []
        }
    },

    methods: {
        _onSubmitBtnClick(e) {
            if (e.target && e.target.closest('[type="submit"]')) {
                this.resetErrors()
            }
        },

        _onEnterKeydown(e) {
            const target = path('target', e)
            const targetTag = path('target.tagName', e)
            const keyCode = path('keyCode', e)

            if (keyCode !== 13 || targetTag !== 'INPUT') return

            const elements = Array.from(
                this.$el.querySelectorAll(FIELDS_SELECTOR)
            )

            const index = elements.indexOf(target)

            if (index < 0) return

            e.preventDefault()

            if (
                index === elements.length - 1 ||
                e.ctrlKey ||
                e.shiftKey ||
                e.metaKey
            ) {
                const submitBtn = this.$el.querySelector('[type="submit"]')
                submitBtn.click()
            } else {
                elements[index + 1].focus()
            }
        },

        _submit() {
            const handler = conf(this, 'submit', function() {})
            return handler.apply(this, arguments)
        },

        resetErrors() {
            const fields = this.$el.elements

            // reset errors
            for (let i = 0, max = fields.length; i < max; i++) {
                const field = fields[i]
                if (typeof field.setCustomValidity === 'function') {
                    field.setCustomValidity('')
                    field.dispatchEvent(new Event('invalid'))
                }
            }
        },

        setErrors() {
            const handler = conf(this, 'setErrors', function(errors) {
                this.errors = errors
            })
            return handler.apply(this, arguments)
        }
    }
}
</script>
