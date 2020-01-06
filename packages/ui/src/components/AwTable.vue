<template>
    <table class="w-full text-sm leading-snug max-w-full overflow-hidden">
        <!-- head -->
        <slot name="thead" :thead="theadVisible">
            <AwTableHead :columns="theadVisible" />
        </slot>

        <!-- body -->
        <tbody class="shadow-md">
            <slot name="tr" :rows="rows">
                <template v-for="(row, rowIndex) in rows">
                    <AwTableRow
                        :key="row.id || rowIndex"
                        v-bind="{
                            row,
                            rowIndex,
                            showToggler: !!hiddenColsIndexes.length,
                            openedRow,
                            columns: visibleColumns
                        }"
                        v-on="
                            $listeners['click:row']
                                ? {
                                      'click:row': $event =>
                                          $emit('click:row', $event)
                                  }
                                : {}
                        "
                        @click:toggle="toggleRow"
                    />
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
import { keys, path, isNil, pathOr } from 'rambdax'
import { ucFirst, toPascal } from '~/assets/js/string'
import AwTableCol from './AwTableCol.vue'
import AwTableColHidden from './AwTableColHidden.vue'
import AwTableRowHidden from './AwTableRowHidden.vue'

const RESIZE_DEBOUNCE = 500

const PRIORITY_ATTR = 'data-priority'

export default {
    name: 'AwTable',

    components: {
        AwTableRowHidden
    },

    props: {
        rows: {
            type: Array,
            required: true
        },

        verticalAlign: String
    },

    data() {
        return {
            hiddenColsIndexes: [],
            openedRow: null
        }
    },

    computed: {
        columns() {
            const _slots = this.$slots.default

            return Array.isArray(_slots)
                ? _slots.filter(this._isColumnComponent).map(col => {
                      if (!col.componentOptions.propsData.verticalAlign) {
                          col.componentOptions.propsData = {
                              ...col.componentOptions.propsData,
                              verticalAlign: this.verticalAlign
                          }
                      }
                      return col
                  })
                : keys(this.rows[0]).map((field, priority) =>
                      this.$createElement(AwTableCol, {
                          props: {
                              field,
                              priority,
                              verticalAlign: this.verticalAlign
                          }
                      })
                  )
        },

        thead() {
            return this.columns.map(column => {
                const _key = path('componentOptions.propsData.field', column)

                const _title = path('componentOptions.propsData.title', column)

                const align = path(
                    'componentOptions.propsData.titleAlign',
                    column
                )

                return {
                    text: isNil(_title) ? ucFirst(_key) : _title,
                    align
                }
            })
        },

        visibleColumns() {
            return this.columns.map((vNode, i) => {
                const isHidden = this.hiddenColsIndexes.includes(i)

                vNode.componentOptions.propsData.isHidden = isHidden

                return vNode
            })
        },

        hiddenColumns() {
            return this.columns.map((vNode, i) => {
                return this.$createElement(AwTableColHidden, {
                    props: {
                        field: path('componentOptions.propsData.field', vNode),
                        title: path([i, 'text'], this.thead)
                    },
                    scopedSlots: path('data.scopedSlots', vNode)
                })
            })
        },

        theadVisible() {
            const hidden = this.hiddenColsIndexes
            return this.thead
                .filter((el, i) => !hidden.includes(i))
                .concat(hidden.length ? [{ text: '' }] : [])
        },

        colspan() {
            return this.theadVisible.length
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

        // Filters only AwTableCol components from scoped slot
        _isColumnComponent(vNode) {
            const tagName = path('componentOptions.tag', vNode)
            const tagNamePascal = toPascal(tagName)

            return tagNamePascal === AwTableCol.name
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
