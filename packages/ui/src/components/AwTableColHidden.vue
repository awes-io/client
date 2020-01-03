<template>
    <tr>
        <td class="p-2 align-top">
            <strong v-if="title">{{ title }}:</strong>
        </td>
        <td class="p-2">
            <slot v-bind="{ cell: cellData, title, index: rowIndex }">
                {{ cellData }}
            </slot>
        </td>
    </tr>
</template>

<script>
import { path } from 'rambdax'

export default {
    name: 'AwTableColHidden',

    props: {
        title: {
            type: String,
            default: null
        },

        field: {
            type: String,
            default: null
        },

        rowData: {},

        rowIndex: {
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
