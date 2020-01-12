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
        }
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
