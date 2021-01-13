<template>
    <thead v-if="columns.length">
        <tr class="bg-mono-800 border-b">
            <th
                v-for="(column, key) in columns"
                :key="key"
                class="py-3 px-4 lg:py-5 lg:px-6 text-left font-normal"
                :class="[
                    column.align,
                    column.orderable ? 'hover:bg-mono-700 cursor-pointer' : ''
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
                'inline-flex': true,
                'col-orderable': col.orderable,
                'col-orderable--asc': this._isParamEqual(col, 'asc', true),
                'col-orderable--desc': this._isParamEqual(col, 'desc')
            }
        },

        _isParamEqual(col, type, checkDefault = false) {
            if (!col.orderable) {
                return false
            }
            const q = this.$route.query[col.orderable.param]

            if (checkDefault) {
                return (
                    q === col.orderable[`${type}Value`] ||
                    this._isColDefault(col)
                )
            }

            return q === col.orderable[`${type}Value`]
        },

        _isColDefault(col) {
            const isParamPresent =
                Object.keys(this.$route.query).indexOf(col.orderable.param) > -1
            return !isParamPresent && col.orderable.default
        }
    }
}
</script>
