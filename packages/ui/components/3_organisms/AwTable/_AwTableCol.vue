<script>
export default {
    name: 'AwTableCol',

    props: {
        /**
         * Path to prop in `rowData` object
         *
         * @example `field="some.nested.0.prop"`
         */
        field: {
            type: String,
            default: null
        },

        /**
         * Column title in `thead`
         */
        title: {
            type: String,
            default: null
        },

        /**
         * Text align of column title in `thead`
         * and text in column cells
         */
        textAlign: {
            // 'left' / 'center' / 'right'
            type: String,
            default: 'left',
            validator(value) {
                return ['text-left', 'text-center', 'text-right'].includes(
                    `text-${value}`
                )
            }
        },

        /**
         * Vertical align of text in cells
         * @type {Object}
         */
        verticalAlign: {
            // 'bottom' / 'middle' / 'top'
            type: String,
            validator(value) {
                return ['align-bottom', 'align-middle', 'align-top'].includes(
                    `align-${value}`
                )
            },
            // The default value is inherited from table component
            default: 'top'
        },

        /**
         * The higher priority goes to mobile view earlier
         *
         * @example `:priority="-1"`
         *
         * @type {Number}
         */
        priority: {
            type: Number,
            default: 0
        },

        /**
         * Orderable config that will be merged with global orderable config.
         * If true then global orderable config will be used
         * If false order by click is disabled
         */
        orderable: {
            type: [Boolean, Object],
            default: false
        }
    },

    render: (h) => h('td', {}, 'stub')
}
</script>
