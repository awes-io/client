<template>
    <thead v-if="columns.length">
        <tr class="bg-muted-dark border-b">
            <th
                v-for="(column, key) in columns"
                :key="key"
                class="py-3 px-4 lg:py-5 lg:px-6 text-left font-normal"
                :class="[
                    column.align,
                    column.orderable
                        ? 'hover:bg-muted-darker cursor-pointer'
                        : ''
                ]"
                @click="$listeners.click ? $listeners.click(column, key) : null"
            >
                <slot name="th" v-bind="{ column, key }">
                    <span :class="getArrowClasses(column)">
                        {{ column.text }}
                    </span>
                </slot>
            </th>
        </tr>
    </thead>
</template>

<script>
import { validateBySchema } from '../assets/js/component'

export default {
    name: 'AwTableHead',

    props: {
        columns: {
            type: Array,
            default: () => [],
            validator: validateBySchema([
                { text: 'string', 'align?': 'string' }
            ])
        }
    },

    methods: {
        getArrowClasses(col) {
            return {
                'col-orderable': col.orderable,
                'col-orderable--asc':
                    col.orderable &&
                    this.$route.query[col.orderable.param] ===
                        col.orderable.ascValue,
                'col-orderable--desc':
                    col.orderable &&
                    this.$route.query[col.orderable.param] ===
                        col.orderable.descValue
            }
        }
    }
}
</script>
