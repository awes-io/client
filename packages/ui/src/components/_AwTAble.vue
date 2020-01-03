<template>
    <table class="w-full text-sm leading-snug max-w-full overflow-hidden">
        <!-- head -->
        <slot name="thead" :thead="_theadVisible">
            <AwTableHead :columns="_theadVisible" />
        </slot>

        <!-- body -->
        <tbody class="shadow-md">
            <slot name="tr" :rows="rows">
                <template v-for="(row, rowIndex) in rows">
                    <AwTableRow
                        :key="row.id || rowIndex"
                        v-bind="{ row, rowIndex, hiddenColsIndexes, openedRow }"
                        v-on="
                            $listeners['click:row']
                                ? {
                                      'click:row': $event =>
                                          $emit('click:row', $event)
                                  }
                                : {}
                        "
                        @click:toggle="toggleRow"
                    >
                        <slot>
                            <AwTableCol
                                v-for="(prop, i) in tbodyDefault"
                                :key="`${prop}-${i}`"
                                :field="prop"
                                :cellIndex="i"
                            />
                        </slot>
                    </AwTableRow>
                    <AwTableRowHidden
                        :key="`hr-${row.id || rowIndex}`"
                        v-bind="{
                            row,
                            rowIndex,
                            hiddenColsIndexes,
                            colspan,
                            columns: hiddenColumns,
                            open: openedRow === rowIndex
                        }"
                    />
                </template>
            </slot>
        </tbody>

        <!-- footer -->
        <slot name="tfoot">
            <!-- <AwTableFoot /> -->
        </slot>
    </table>
</template>

<script>
import { path, isNil, pathOr } from 'rambdax'
import { ucFirst } from '~/assets/js/string'
import tableMixin from '~/mixins/table'
import AwTableRowHidden from './AwTableRowHidden.vue'

const RESIZE_DEBOUNCE = 500

const PRIORITY_ATTR = 'data-priority'

export default {
    name: 'AwTable',

    components: {
        AwTableRowHidden
    },

    mixins: [tableMixin],

    props: {
        rows: {
            type: Array,
            required: true
        },

        thead: {
            type: Array,
            default: null
        }
    },

    data() {
        return {
            hiddenColsIndexes: [],
            openedRow: null
        }
    },

    computed: {
        customColumns() {
            const _slots = this.$slots.default

            return (
                Array.isArray(_slots) && _slots.filter(this._isColumnComponent)
            )
        },

        /**
         * If no custom columns specified, returns first row keys
         * @return {Array<String>} - all object keys by default
         */
        tbodyDefault() {
            return !this.customColumns && Object.keys(this.rows[0])
        },

        _thead() {
            // Retrieve data from scoped slot columns
            if (this.customColumns) {
                return this.customColumns.map(column => {
                    const _key = path(
                        'componentOptions.propsData.field',
                        column
                    )

                    const _title = path(
                        'componentOptions.propsData.title',
                        column
                    )

                    const align = path(
                        'componentOptions.propsData.titleAlign',
                        column
                    )

                    return {
                        text: isNil(_title) ? ucFirst(_key) : _title,
                        align
                    }
                })
            } else if (this.thead) {
                // Return custom thead
                return this.thead
            } else {
                // Capitalize default columns keys
                return this.tbodyDefault.map(ucFirst)
            }
        },

        _theadVisible() {
            const hidden = this.hiddenColsIndexes
            return this._thead
                .filter((el, i) => !hidden.includes(i))
                .concat(hidden.length ? [{ text: '' }] : [])
        },

        colspan() {
            return this._theadVisible.length
        },

        hiddenColumns() {
            return (
                (this.customColumns &&
                    this.customColumns.map((vNode, i) => ({
                        title: this._thead[i],
                        field: pathOr(
                            '',
                            'componentOptions.propsData.field',
                            vNode
                        ),
                        staticClass: pathOr('', 'data.staticClass', vNode),
                        scopedSlot: pathOr(
                            null,
                            'data.scopedSlots.default',
                            vNode
                        )
                    }))) ||
                this.tbodyDefault.map((field, i) => ({
                    title: this._thead[i],
                    field
                }))
            )
        }
    },

    watch: {
        rows() {
            this.openedRow = null
        },

        hiddenColsIndexes(arr) {
            if (!arr.length) this.openedRow = null
        }
    },

    mounted() {
        console.log(this.$scopedSlots.default)
        let resizeTm

        const onResize = () => {
            clearTimeout(resizeTm)
            resizeTm = setTimeout(async () => {
                this.hiddenColsIndexes = this._getHiddenColsIndexes()
            }, RESIZE_DEBOUNCE)
        }

        // call with setTimeout, kind of nextTick
        onResize()

        window.addEventListener('resize', onResize)

        this.$once('hook:beforeDestroy', () => {
            clearTimeout(resizeTm)
            window.removeEventListener('resize', onResize)
        })
    },

    methods: {
        toggleRow(index) {
            this.openedRow = this.openedRow === index ? null : index
        },

        _getParentEl() {
            return pathOr(null, '$el.parentElement', this)
        },

        _getFirstRow() {
            return Array.from(
                this.$el.querySelectorAll(
                    `tbody > :first-child > [${PRIORITY_ATTR}]`
                )
            )
        },

        _hasOverflowWidth() {
            const parent = this._getParentEl()

            if (parent) {
                return parent.clientWidth < this.$el.clientWidth
            } else {
                return false
            }
        },

        _sortColumnsByPriority(columns) {
            return columns
                .map((el, index) => ({ el, index }))
                .sort((a, b) => {
                    const aPrior = parseFloat(a.el.getAttribute(PRIORITY_ATTR))
                    const bPrior = parseFloat(b.el.getAttribute(PRIORITY_ATTR))

                    return aPrior - bPrior
                })
        },

        _toggleColDisplay(col, on = true) {
            col.style.display = on ? null : 'none'
        },

        _getHiddenColsIndexes() {
            // manipulate only first row
            const columns = this._getFirstRow()

            columns.forEach(col => this._toggleColDisplay(col))

            let hiddenIndexes = []

            if (this._hasOverflowWidth()) {
                // calculate columns
                const sorted = this._sortColumnsByPriority(columns)

                let maxWidth = this._getParentEl().clientWidth

                hiddenIndexes = sorted.reduce((acc, { el, index }) => {
                    // subtract el width from global width
                    maxWidth -= el.offsetWidth

                    if (maxWidth < 0) {
                        acc.push(index)
                        this._toggleColDisplay(columns[index], false)
                    }

                    return acc
                }, [])
            }

            if (!hiddenIndexes.length) {
                this._toggleColDisplay(columns[columns.length - 1], false)
            }

            return hiddenIndexes
        }
    }
}
</script>
