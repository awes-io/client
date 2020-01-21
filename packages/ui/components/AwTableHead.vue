<template functional>
    <thead v-if="props.columns">
        <tr class="bg-muted-dark border-b">
            <th
                v-for="(column, key) in props.columns"
                :key="key"
                class="py-3 px-4 lg:py-5 lg:px-6 text-left font-normal"
                :class="column.align ? `text-${column.align}` : ''"
            >
                <slot name="th" v-bind="{ column, key }">
                    {{ $options._getTitle(column) }}
                </slot>
            </th>
        </tr>
    </thead>
</template>

<script>
import { pathOr } from 'rambdax'

export default {
    name: 'AwTableHead',

    props: {
        columns: {
            type: Array,
            default: null
        }
    },

    _getTitle(titleObj) {
        return pathOr(titleObj, 'text', titleObj)
    }
}
</script>
