<template>
    <td
        v-show="!isHidden"
        class="py-3 px-4 lg:py-5 lg:px-6"
        :class="[`align-${verticalAlign}`, { 'border-t': rowIndex }]"
        :data-priority="rowIndex ? null : priority"
    >
        <slot v-bind="{ cell: cellData, title, index: rowIndex }">
            {{ cellData }}
        </slot>
    </td>
</template>

<script>
import { path } from 'rambdax'
import { AwTable as config } from './_config'

export default {
    name: 'AwTableCol',

    props: {
        /**
         * Path to prop in rowData object
         *
         * @example `field="some.nested.0.prop"`
         *
         * @type {String}
         */
        field: {
            type: String,
            default: null
        },

        title: {
            type: String,
            default: null
        },

        titleAlign: {
            type: String,
            default: 'left'
        },

        verticalAlign: {
            type: String,
            default: 'top',
            validator(value) {
                return config.valignValues.includes(value)
            }
        },

        isHidden: {
            type: Boolean
        },

        rowData: {},

        rowIndex: {
            type: Number,
            default: 0
        },

        /**
         * the higher priority goes to mobile view earlier
         *
         * @example `:priority="-1"`
         *
         * @type {Number}
         */
        priority: {
            type: Number,
            default: 0
        }
    },

    computed: {
        cellData() {
            return this.rowData && this.field
                ? path(this.field, this.rowData)
                : this.rowData
        }
    }
}
</script>
