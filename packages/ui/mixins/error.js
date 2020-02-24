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

    computed: {
        _tooltipOffset() {
            return [0, -6]
        },

        errorTooltip() {
            return this.errorText
                ? {
                      id: this.errorId,
                      onclick: this._onErrorClick,
                      content: this.errorText,
                      class: 'bg-error',
                      offset: this._tooltipOffset
                  }
                : null
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
