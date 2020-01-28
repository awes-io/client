import { FORM_ENTER_SKIP_ATTR } from '../assets/js/constants'

let fieldId = 0

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
