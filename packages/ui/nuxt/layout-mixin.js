import { isType } from 'rambdax'

export default {
    head() {
        if (isType('Function', this.$nuxtI18nSeo)) {
            const meta = this.$nuxtI18nSeo()

            return {
                ...meta,
                htmlAttrs: {
                    ...meta.htmlAttrs,
                    ...(this.isDarkTheme ? { 'data-dark': true } : {})
                }
            }
        } else if (this.isDarkTheme) {
            return {
                htmlAttrs: { 'data-dark': true }
            }
        }
    },

    computed: {
        isDarkTheme() {
            return this.$store.state.awesIo.isDarkTheme
        }
    }
}
