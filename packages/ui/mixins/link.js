export default {
    inheritAttrs: false,

    props: {
        href: {
            type: [String, Object],
            default: ''
        }
    },

    computed: {
        _linkComponent() {
            switch (typeof this.href) {
                case 'object':
                    return this.href ? 'NLink' : 'button'
                case 'string':
                    return this.href
                        ? /^(\/\/|\w+:)/.test(this.href)
                            ? 'a'
                            : 'NLink'
                        : 'button'
                default:
                    return 'button'
            }
        },

        _linkAttrs() {
            switch (this._linkComponent) {
                case 'NLink':
                    return { ...this.$attrs, to: this.href }
                case 'a':
                    return { ...this.$attrs, href: this.href }
                default:
                    return this.$attrs
            }
        }
    }
}
