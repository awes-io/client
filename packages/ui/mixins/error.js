let errorId = 0

export default {
    props: {
        error: String
    },

    data() {
        return {
            errorId: `error-${errorId++}`,
            errorText: '',
            hasError: false
        }
    },

    watch: {
        error: {
            handler(val) {
                this.setError(val)
            },
            immediate: true
        }
    },

    methods: {
        setError(value) {
            this.errorText = value
            this.hasError = !!value
            if (!value) {
                this._resetCustomError()
            }
        },

        _getElement() {
            return this.$refs.element
        },

        _onInvalid($event) {
            $event.preventDefault()
            this.setError($event.target.validationMessage)
        },

        _onErrorClick() {
            // next line only reset text, status is reset on user input
            this.errorText = ''

            const el = this._getElement()

            if (el) {
                el.focus()
                this._resetCustomError(el)
            }
        },

        _resetCustomError(el = this._getElement()) {
            if (el && typeof el.setCustomValidity === 'function') {
                el.setCustomValidity('')
            }
        }
    }
}
