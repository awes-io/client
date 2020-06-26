import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'

export default {
    inheritAttrs: false,

    props: {
        /**
         * Text in label element of field block
         */
        label: {
            type: String,
            default: ''
        },

        /**
         * Field id attribute
         */
        id: {
            type: String,
            // `input-${uniqId}`
            default: ''
        },

        /**
         * Skip field on enter key press on previous field
         */
        enterSkip: Boolean
    },

    data() {
        return {
            defaultId: null
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

    mounted() {
        if (!this.id && !this.defaultId) {
            this.defaultId = `input-${this._uid}`
        }
    },

    methods: {
        /**
         * @vuese
         * Focus on current field
         */
        focus() {
            if (this.$refs.element) {
                this.$refs.element.focus()
            }
        }
    }
}
