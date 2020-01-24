import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'

let fieldId = 0

export default {
    inheritAttrs: false,

    props: {
        label: {
            type: String,
            default: ''
        },

        id: {
            type: String,
            default: ''
        },

        /**
         * Skip field on enter click
         */
        enterSkip: Boolean
    },

    data() {
        return {
            defaultId: `input-${fieldId++}`
        }
    },

    computed: {
        wrapperClasses() {
            return null
        },

        mergedListeners() {
            return this.$listeners
        },

        skipAttr() {
            return { [FORM_ENTER_SKIP_ATTR]: this.enterSkip ? '' : null }
        }
    },

    methods: {
        focus() {
            if (this.$refs.element) {
                this.$refs.element.focus()
            }
        }
    }
}
